import * as vscode from "vscode";
import * as init from "./init";

import TMC from "./api/tmc";
import Storage from "./config/storage";
import UI from "./ui/ui";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "tmc-vscode" is now active!');

    init.firstTimeInitialization(context);

    const ui = new UI(context);
    const storage = new Storage(context);
    const tmc = new TMC(storage);

    init.registerUiActions(context, ui, storage, tmc);

    context.subscriptions.push(vscode.commands.registerCommand("tmcView.activateEntry", ui.createUiActionHandler()));
}

export function deactivate() {}
