plugInName = 'eomedia';

CKEDITOR.plugins.add(plugInName,
{
  init: function (editor) {
    var mypath = this.path;
    editor.addCommand('eomedia', new CKEDITOR.dialogCommand('eomedia'));
    editor.ui.addButton(plugInName, {
        label: 'Eo Media',
        icon: mypath + 'images/icon.png',
        command: 'eomedia'
    });

    CKEDITOR.dialog.add('eomedia', function (editor) {
        return {
            title: 'Eo Media',
            minWidth: 600,
            minHeight: 400,
            contents: [
                        {
                            id: 'general',
                            label: 'Settings',
                            elements:
                            [
                            // UI elements of the Settings tab.
                                {
                                type: 'textarea',
                                id: 'contents',
                                rows: 25,
                                onShow: function () {
                                    this.setValue(editor.container.$.innerHTML);

                                },
                                commit: function (data) {              //--I get only the body part in case I paste a complete html
                                    data.contents = this.getValue().replace(/^[\S\s]*<body[^>]*?>/i, "").replace(/<\/body[\S\s]*$/i, "");
                                }

                            }
                                ]
                        }
                    ],

            onOk: function () {
                var data = {};
                this.commitContent(data);
                $(editor.container.$).html(data.contents);
            },
            onCancel: function () {
                //  console.log('Cancel');
            }
        };
    });
}


});

//--------------------Plugin Code Ends Here--------------------