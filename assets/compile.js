function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init:function(){
    if(this.el){
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    }else{
      console.log('Dom元素不存在');
    }
  },
  nodeToFragment:function(el){
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while(child){
      //将Dom元素移入fragment中
      fragment.appendChild(child);
      child= el.firstChild;
    }
    return fragment;
  },
  compileElement:function(el){
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node){
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if(self.isElementNode(node)){
        self.compile(node);
      }else if(self.isTextNode(node)&&reg.test(text)){
        self.compileText(node,reg.exec(text)[1]);
      }

      if(node.childNodes&&node.childNodes.length){
        self.compileElement(node);
      }
    });
  },
  compile:function(node){
    var nodeAttrs = node.attributes;
    var self =this;
    Array.prototype.forEach.call(nodeAttrs,function(attr){
      var attrName = attr.name;
      if(self.isDirective(attrName)){
        var exp =attr.value;
        var dir = attrName.substring(2);
        if(self.isEventDirective(dir)){
          self.compileEvent(node,self.vm,exp,dir);
        }else{
          self.compileModel(node,self.vm,exp,dir);
        }
        node.removeAttribute(attrName);
      }
    });
  },

  
}