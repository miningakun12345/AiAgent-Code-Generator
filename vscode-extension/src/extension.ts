import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand('aiAgent.openWebview', () => {
    const panel = vscode.window.createWebviewPanel(
      'aiAgentWebview',
      'AI Agent PoC',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview'))]
      }
    );

    const htmlPath = path.join(context.extensionPath, 'webview', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    // rewrite local resource URIs
    html = html.replace(/(src|href)="([^"]+)"/g, (m: any, p1: any, p2: string) => {
      if (p2.startsWith('http')) return `${p1}="${p2}"`;
      const uri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'webview', p2)));
      return `${p1}="${uri}"`;
    });

    panel.webview.html = html;
  });

  context.subscriptions.push(cmd);
}

export function deactivate() {}

