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
  }

  
}