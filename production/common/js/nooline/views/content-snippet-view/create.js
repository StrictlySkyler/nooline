define([],function(){var e=window.Nooline;return e.Views.ContentSnippetView.prototype.create=function(){var t,i,n=this.model.get("type"),s='<h3 class="headline">'+this.model.get("headline")+"</h3>",l='<p class="text">'+this.model.get("text")+"</p>";"timeline"===n?($("#narrative").remove(),e.buildTimeline(this.model.collection.category.attributes)):(i=$("<article></article>").attr({id:this.model.get("uuid")+"-article"}).html(s+l),t=$("<div></div>").attr({id:this.model.get("uuid"),"class":"snippet"}).append(i),$("#"+n+"-controls").after(t),this.setElement(t),this.bindEvents(t)),this.setOptions({create:!1,editable:!0,added:!0})},"views/content-snippet-view/create"});