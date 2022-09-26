'use babel';

import WenudView from './wenud-view';
import { CompositeDisposable } from 'atom';

export default {

  wenudView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wenudView = new WenudView(state.wenudViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wenudView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wenud:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wenudView.destroy();
  },

  serialize() {
    return {
      wenudViewState: this.wenudView.serialize()
    };
  },

  toggle() {
    console.log('Wenud was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
