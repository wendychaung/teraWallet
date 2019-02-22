function toggleButton(){
  toggleClassname('menu-toggle','is-clicked');
  toggleClassname('menu-nav-wrap','menu-is-open');
  toggleClassname('main-header','menu-is-open');
  toggleClassname('main-404-content','menu-is-open');
  toggleClassname('body','overflow-hidden');
  // mainContent.toggleClass('menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  //   // firefox transitions break when parent overflow is changed,
  //   // so we need to wait for the end of the trasition to give the body an overflow hidden
  //   $('body').toggleClass('overflow-hidden');
  // });
  //
  // // check if transitions are not supported
  // if($('html').hasClass('no-csstransitions')) {
  //   $('body').toggleClass('overflow-hidden');
  // }

}

function toggleClassname(objname,classnames) {
  if($(objname).className.indexOf(classnames) >-1){
    const arr=$(objname).className.split(" ");
    arr.pop();
    $(objname).className=arr.join(" ");
  } else {
    $(objname).className +=" "+classnames;
  }
}
