/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
  
  config.toolbar = [
      ['Undo'],
      ['Redo'],
      ['Bold'], 
      ['Italic'], 
      ['Underline'], 
      ['Strike'],
      ['TextColor'],
      ['BGColor'],
      ['RemoveFormat'],
      ['FontSize'],
      ['NumberedList'],
      ['BulletedList'],
      ['BlockQuote'],
      ['Link'],
      ['Unlink'],
      ['Table'],
      ['Image'],
      ['MediaEmbed'],
      ['ShowBlocks']
  ];

  config.allowedContent = true;

  config.fillEmptyBlocks = false;

  config.templates_replaceContent = false;

  config.skin = 'nooline,/common/js/nooline/config/ckeditor/skins/nooline/'

};
