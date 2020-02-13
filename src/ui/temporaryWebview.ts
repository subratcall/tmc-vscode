import * as vscode from "vscode";

import Resources from "../config/resources";
import UI from "./ui";

/**
 * A class for temporary webviews
 */
export default class TemporaryWebview {

    public disposed: boolean;
    public resultsShownInTempView: boolean | undefined;

    private panel: vscode.WebviewPanel;
    private ui: UI;

    constructor(resources: Resources, ui: UI, title: string, messageHandler: (msg: any) => void) {
        this.panel = vscode.window.createWebviewPanel("tmctemp", title, vscode.ViewColumn.Two,
                        { enableScripts: true });
        this.panel.onDidDispose(() => { this.disposed = true; });
        this.panel.webview.onDidReceiveMessage(messageHandler);
        this.panel.iconPath = vscode.Uri.file(`${resources.mediaFolder}/TMC.svg`);
        this.disposed = false;
        this.resultsShownInTempView = false;
        this.ui = ui;
        this.panel.reveal(undefined, true);
    }

    /**
     * Sets the content of the webview using an HTML template
     *
     * @param templateName Name of the template to use
     * @param data Data to be passed to the template engine
     * @param results Boolean if the temporary webview content/data is test results
     */
    public async setContent(templateName: string, data?: any, isResults?: boolean) {
        this.resultsShownInTempView = isResults;
        this.panel.webview.html = await this.ui.webview.templateEngine.getTemplate(
            this.panel.webview, templateName, data);
        this.panel.reveal(undefined, true);
    }

    /**
     * Closes the webview
     */
    public dispose() {
        this.panel.dispose();
    }

}
