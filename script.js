var lightMode = 'white';
var darkMode = '#25273c';
var modeIcon = 'moon';//initiate current visible icon
let jsLoaded = false;
var windowWidth, form, item;
var count = 0;
var newCount=0;
var wrapper_stat,box_stat,ul,li_all,li_active, li_comp;
var p_clear,p_counts,li_clear,li_counts;
var a_all,a_active,a_comp,a_clear,a_counts; // a tag variables
var clr,cnt;// clear and count
var div;// circle
var bg_pic,num;
var checked = 0
let itemsActive= 0

var input_container,s_count,clear,ull,all,act,comp,box_2;
var box,ul_todo,li_circle,p1,li_item,p2,li_cross,img_cross,br,img_check
var list_ovals ,lists,cross,boxes ,li_cir,li_txt ,li_crs, check_count
var itemCount = 0
var rem,add;
// holds remove or add states
// 0 and 1 for each state
document.addEventListener("DOMContentLoaded", function () {

  wrapper_stat = document.getElementById('container-status');
  wrapper_stat.style.marginBottom='10px'
  wrapper_stat.style.paddingRight='5px'
  wrapper_stat.style.paddingLeft='5px'
  wrapper_stat.style.borderRadius='5px'

  // create a new item inside a div(wrapper)
  box_stat = document.createElement('div');
  p_counts = document.createElement('p');
  ul = document.createElement('ul');
  li_all = document.createElement('li');
  li_active = document.createElement('li');
  li_comp = document.createElement('li');
  p_clear = document.createElement('p');
  a_all = document.createElement('a');
  a_active = document.createElement('a');
  a_comp = document.createElement('a');

  box_stat.setAttribute('id', 'box_stat');
  p_counts.setAttribute('id', 'p_counts');
  ul.setAttribute('id', 'p_ul');
  p_clear.setAttribute('id', 'p_clear');

  li_all.setAttribute('id', 'tag_all');
  li_active.setAttribute('id', 'tag_active');
  li_comp.setAttribute('id', 'tag_comp');

  //screen size for each background
  if (window.innerWidth <= 576) {
    windowWidth = 'lesser';
  }else if (window.innerWidth >= 576){
     windowWidth = 'greater';
   }
   // circles for tick actions
   div = document.getElementById('div_oval');
   div.setAttribute('style','text-align: center')
   div.style.borderRadius = '50%'
   div.style.display = 'flex';
   div.style.justifyContent = 'center';
   div.style.alignItems = 'center';
   div.style.height = '14px';
   div.style.width = '14px';
   div.style.border = '1px solid hsl(240deg 6.21% 65.29%)';
   // set background for form input
   document.getElementsByTagName('li')[0].style.backgroundColor = darkMode
   // if script is loaded
   jsLoaded = true;

    // for media query
    var x = window.matchMedia("(max-width: 576px)")
    myFunction(x,modeIcon) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
    windowWidth = x

    if (jsLoaded==true) {
      bg_pic = document.getElementById("bg");
      bg_pic.style.backgroundSize='cover';
      bg_pic.style.backgroundRepeat='no-repeat';

            switch (modeIcon) {
              case 'sun':
              //sun icon visible
              //background = white, text = dark
                    if (document.getElementById('p_counts')!=null) {
                      document.getElementById('p_counts').style.color = darkMode
                      document.getElementById('p_clear').style.color = darkMode
                      document.getElementById('box_stat').style.backgroundColor = lightMode
                      document.getElementById('container-status').style.backgroundColor = lightMode
                    }
                    //background when Completed and ... become inline with rest of list
                    if ((document.getElementsByTagName('a')[0])!=null) {
                      document.getElementsByTagName('a')[0].style.color = darkMode;
                      document.getElementsByTagName('a')[1].style.color = darkMode;
                      document.getElementsByTagName('a')[2].style.color = darkMode;
                      document.getElementById('container-status').style.backgroundColor = lightMode;
                    }
                    // set background for desktop and mobile dark mode
                    if (windowWidth=='lesser') {
                      document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-light.jpg)"
                      }else {
                        document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-light.jpg)"
                      }
              break;

              case 'moon':
              //moon icon visible
              //background = dark, text = white
                    if (document.getElementById('p_counts')!=null) {
                      document.getElementById('p_counts').style.color = lightMode
                      document.getElementById('p_clear').style.color = lightMode
                      document.getElementById('box_stat').style.backgroundColor = darkMode
                      document.getElementById('container-status').style.backgroundColor = darkMode
                    }

                    //background when Completed and ... become inline with rest of list
                    if ((document.getElementsByTagName('a')[0])!=null) {
                      document.getElementsByTagName('a')[0].style.color = lightMode;
                      document.getElementsByTagName('a')[1].style.color = lightMode;
                      document.getElementsByTagName('a')[2].style.color = lightMode;
                      document.getElementById('container-status').style.backgroundColor = darkMode;
                    }
                    if (windowWidth=='lesser') {
                      document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-dark.jpg)"
                    }else {
                      document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-dark.jpg)"
                    }

                      break;
              default:
              }

    }

    // push attribution text down
    document.getElementById('bg').style.marginBottom = '350px'

    // listening to inputs from form
    form = document.querySelector("form");
    form.addEventListener("submit", event => {
    //console.log("Todo: ", form.elements.todo_input.value);
    if (form.elements.todo_input.value=='') {
      alert('Write to add to your list')
    }else {
      item = form.elements.todo_input.value;
      event.preventDefault();
      createNewDo(item);
      form.elements.todo_input.value='';
    }
   });

  // listening to click for search
     var search_icon = document.getElementById('div_oval');
     search_icon.addEventListener("click", event => {
       console.log("search")
       mySearch();// call search function
       event.preventDefault()
      });

      //item count
      for (var i = 0; i < count; i++) {
        if (document.getElementsByClassName('boxes')[i].style.visibility=='hidden') {
          newCount = newCount+1;// get number of hidden items
          console.log(newCount+ 'hidden items');
        }
      }
      var thisCount = count - newCount;

      //call updateCounter function here
      rem = 0;// 0 for no item removed
      add = 0;// 0 for no item added
      holder = windowWidth;
      updateCounter(rem,add,holder)
      getAll()
      getActive()
      getCompleted()
      clearCompleted()

      //height for list
      // push contents down as list expands
      switch (thisCount) {
        case 1:
          document.getElementsByClassName('container-new')[0].style.minHeight = '40px'
        break;

        case 2:
          document.getElementsByClassName('container-new')[0].style.minHeight = '80px'
        break;

        case 3:
          document.getElementsByClassName('container-new')[0].style.minHeight = '120px'
        break;

        case 4:
          document.getElementsByClassName('container-new')[0].style.minHeight = '160px'
        break;

        case 5:
          document.getElementsByClassName('container-new')[0].style.minHeight = '200px'
        break;

        case 6:
          document.getElementsByClassName('container-new')[0].style.minHeight = '240px'
        break;

        // create a scrollable list that does not exceed 7 items before it scrolls
        case 7:
          var vv=document.getElementsByClassName('container-new')[0]
          vv.style.minHeight = '300px'
          vv.style.overflow='scroll'
        break;

        default:
      }

 });

function width_less(){
  wrapper_stat.style.paddingBottom='40px'
  wrapper_stat.appendChild(p_counts);
  wrapper_stat.appendChild(p_clear);

  rem = 0;
  add = 0;
  holder = 'lesser';
  updateCounter(rem,add,holder)

  p_clear.textContent = 'Clear Completed';

  input_container = document.getElementsByClassName('add_input')[0];
  input_container.appendChild(box_stat);
  box_stat.appendChild(ul);
  ul.appendChild(li_all);
  li_all.appendChild(a_all);
  ul.appendChild(li_active);
  li_active.appendChild(a_active);
  ul.appendChild(li_comp);
  li_comp.appendChild(a_comp);
  a_all.textContent = 'All';
  a_active.textContent = 'Active';
  a_comp.textContent = 'Completed';

  s_count = document.getElementById('p_counts');
  s_count.style.marginBlockEnd = 0;
  s_count.style.marginBlockStart = 0;
  s_count.style.float = 'left';
  s_count.style.marginTop = '10px';

  clear = document.getElementById('p_clear');
  clear.style.marginBlockEnd = 0;
  clear.style.marginBlockStart = 0;
  clear.style.float = 'right';
  clear.style.marginTop = '10px';

  ull = document.getElementById('p_ul');
  ull.style.marginBlockEnd = 0;
  ull.style.marginBlockStart = 0;
  ull.style.marginTop = '10px';
  ull.style.display = 'inline-block';

  all = document.getElementById('tag_all');
  all.style.marginBlockEnd = 0;
  all.style.marginBlockStart = 0;
  all.style.marginTop = '10px';
  all.style.display = 'block';

  act = document.getElementById('tag_active');
  act.style.marginBlockEnd = 0;
  act.style.marginBlockStart = 0;
  act.style.marginTop = '10px';
  act.style.display = 'block';

  comp = document.getElementById('tag_comp');
  comp.style.marginBlockEnd = 0;
  comp.style.marginBlockStart = 0;
  comp.style.marginTop = '10px';
  comp.style.display = 'block';

  box_2 = document.getElementById('box_stat');
  box_2.style.marginBottom='10px'
  box_2.style.paddingRight='5px'
  box_2.style.paddingLeft='5px'
  box_2.style.paddingBottom='10px'
  box_2.style.borderRadius='5px'

  document.getElementsByTagName('li')[1].style.display='inline'
  document.getElementsByTagName('li')[2].style.display='inline'
  document.getElementsByTagName('li')[3].style.display='inline'

  //if dark or light modeIcon
    if (modeIcon == 'sun') {
      //sun icon visible
      //background = white, text = dark
        document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-light.jpg)"
        document.getElementById('box_stat').style.backgroundColor=lightMode
        document.getElementById('container-status').style.backgroundColor=lightMode
        //initialize text color of items left and clear completed to white(in dark modeIcon)
        document.getElementById('p_counts').style.color = darkMode
        document.getElementById('p_clear').style.color = darkMode
      } else {
        document.getElementById('box_stat').style.backgroundColor=darkMode
        document.getElementById('container-status').style.backgroundColor=darkMode
        document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-dark.jpg)"
        document.getElementById('p_counts').style.color = lightMode
        document.getElementById('p_clear').style.color = lightMode
      }
}

function width_greater(){
  wrapper_stat.style.paddingBottom='15px'
  li_count = document.createElement('li');
  li_clear = document.createElement('li');
  a_count = document.createElement('a');
  a_clear = document.createElement('a');
  li_count.setAttribute('id', 'tag_count');
  li_clear.setAttribute('id', 'tag_clear');

  wrapper_stat.appendChild(ul);
  ul.appendChild(li_count);
     li_count.appendChild(a_count);

     rem = 0;
     add = 0;
     holder = 'greater';
     updateCounter(rem,add,holder)

  ul.appendChild(li_all);
     li_all.appendChild(a_all);
     a_all.textContent = 'All';
  ul.appendChild(li_active);
     li_active.appendChild(a_active);
     a_active.textContent = 'Active';
  ul.appendChild(li_comp);
     li_comp.appendChild(a_comp);
     a_comp.textContent = 'Completed';
  ul.appendChild(li_clear);
     li_clear.appendChild(a_clear);
     a_clear.textContent = 'Clear Completed';

  cnt = document.getElementById('tag_count');
  cnt.style.marginBlockEnd = 0;
  cnt.style.marginBlockStart = 0;
  cnt.style.marginTop = '10px';
  cnt.style.display = 'block';

  clr = document.getElementById('tag_clear');
  clr.style.marginBlockEnd = 0;
  clr.style.marginBlockStart = 0;
  clr.style.marginTop = '10px';
  clr.style.display = 'block';

  ull = document.getElementById('p_ul');
  ull.style.marginBlockEnd = 0;
  ull.style.marginBlockStart = 0;
  ull.style.marginTop = '10px';
  ull.style.display = 'inline-block';

  all = document.getElementById('tag_all');
  all.style.marginBlockEnd = 0;
  all.style.marginBlockStart = 0;
  all.style.marginTop = '10px';
  all.style.display = 'block';

  act = document.getElementById('tag_active');
  act.style.marginBlockEnd = 0;
  act.style.marginBlockStart = 0;
  act.style.marginTop = '10px';
  act.style.display = 'block';

  comp = document.getElementById('tag_comp');
  comp.style.marginBlockEnd = 0;
  comp.style.marginBlockStart = 0;
  comp.style.marginTop = '10px';
  comp.style.display = 'block';

    document.getElementsByTagName('li')[1].style.display='inline'
    document.getElementsByTagName('li')[2].style.display='inline'
    document.getElementsByTagName('li')[3].style.display='inline'
    document.getElementsByTagName('li')[4].style.display='inline'
    document.getElementsByTagName('li')[5].style.display='inline'

    if (modeIcon == 'sun') {
      //sun icon visible
      //background = white, text = dark
      document.getElementById('container-status').style.backgroundColor=lightMode
      document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-light.jpg)"
      document.getElementById('tag_count').style.color = darkMode
      document.getElementById('tag_comp').style.color = darkMode
      document.getElementById('tag_active').style.color = darkMode
      document.getElementById('tag_all').style.color = darkMode
    }else{
      document.getElementById('container-status').style.backgroundColor=darkMode
      document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-dark.jpg)"
      document.getElementById('tag_count').style.color = lightMode
      document.getElementById('tag_comp').style.color = lightMode
      document.getElementById('tag_active').style.color = lightMode
      document.getElementById('tag_all').style.color = lightMode
   }

}

//click handler for changing from sun to moon
function click_change(){
  var icon_svg = document.getElementById('icon_click');
  var input_bg = document.getElementsByTagName('li')[0];
  let att = document.getElementById('att');

  //if sun modeIcon
if (icon_svg.src =='/todo-app-main/todo-app-main/images/icon-sun.svg') {
      modeIcon = 'sun';
      document.getElementsByTagName('p')[0].style.color = darkMode;
      // change body background to white
      document.body.style.backgroundColor = lightMode;
      input_bg.style.backgroundColor= lightMode;
      //change text color
      att.style.color = darkMode;
      document.getElementsByClassName('attribution')[0].children[0].style.color = darkMode
      document.getElementsByTagName('a')[0].style.color = darkMode
      document.getElementsByTagName('a')[1].style.color = darkMode
      document.getElementsByTagName('a')[2].style.color = darkMode
      document.getElementById('container-status').style.backgroundColor = lightMode

      // these are not shown for desktop view so may return null
      if (document.getElementById('p_counts')!=null) {
        document.getElementById('box_stat').style.backgroundColor = lightMode
        document.getElementById('p_counts').style.color = darkMode
        document.getElementById('p_clear').style.color = darkMode
      }

      if (document.getElementsByTagName('a')[3]!=null) {
        document.getElementsByTagName('a')[3].style.color = darkMode
        document.getElementsByTagName('a')[4].style.color = darkMode
      }
      // get all the boxes and set their background color as one
      // but some class names change from boxes to complete
      if (document.getElementsByClassName('boxes').length!=0) {
          for (var i = 0; i < document.getElementsByClassName('boxes').length; i++) {
              let bx = document.getElementsByClassName('boxes');
              bx[i].style.backgroundColor = lightMode;
              bx[i].children[0].children[1].style.color = darkMode

                if ( bx[i] == undefined) {//if box is removed
                  let bc = document.getElementsByClassName('complete');
                  bc[i].style.backgroundColor = lightMode;
                  bc[i].children[0].children[1].style.color = darkMode
              }
            }
        }

      //change icon to moon
      document.getElementById("icon_click").src="/todo-app-main/images/icon-moon.svg";

    }else if(icon_svg.src =='/todo-app-main/images/icon-moon.svg'){
      modeIcon = 'moon';
      // change body background to dark mode
      document.body.style.backgroundColor = darkMode;
      input_bg.style.backgroundColor = darkMode;
      //change text color
      att.style.color=lightMode;
      document.getElementsByClassName('attribution')[0].children[0].style.color = lightMode
      document.getElementsByTagName('a')[0].style.color = lightMode
      document.getElementsByTagName('a')[1].style.color = lightMode
      document.getElementsByTagName('a')[2].style.color = lightMode
      document.getElementById('container-status').style.backgroundColor = darkMode
      document.getElementsByTagName('p')[0].style.color=lightMode;
        //handle error in desktop view when this returns null
      if (document.getElementById('p_counts')!=null) {
        document.getElementById('p_counts').style.color = lightMode
        document.getElementById('p_clear').style.color = lightMode
        document.getElementById('box_stat').style.backgroundColor = lightMode
      }
      //background when Completed and ... become inline with rest of list
      if (document.getElementsByTagName('a')[3]!=null) {
        document.getElementsByTagName('a')[3].style.color = lightMode
        document.getElementsByTagName('a')[4].style.color = lightMode
      }
      // get all the boxes and set their background color as one
      // but some class names change from boxes to complete
      if (document.getElementsByClassName('boxes').length!=0) {

          for (var i = 0; i < document.getElementsByClassName('boxes').length; i++) {
              let bx = document.getElementsByClassName('boxes');
              bx[i].style.backgroundColor = darkMode;
              bx[i].children[0].children[1].style.color = lightMode

                if ( bx[i] == undefined) {//if box is removed
                  let bc = document.getElementsByClassName('complete');
                  bc[i].style.backgroundColor = darkMode;
                  bc[i].children[0].children[1].style.color = lightMode
              }
            }
        }
      //change icon to sun
      document.getElementById("icon_click").src="/todo-app-main/images/icon-sun.svg";
  }
changeBg(windowWidth,modeIcon);
}

//change backgroundImage when icon is clicked
function changeBg(x,modeIcon) {

  if (x.matches) { // If media query matches
    //mobile background
          if (modeIcon=='sun') {// light mobile image
            console.log(modeIcon + '-sun modeIcon mobile');
            document.getElementById('container-status').style.backgroundColor=lightMode
            document.getElementById('box_stat').style.backgroundColor=lightMode
            //att.style.color=lightMode;
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-light.jpg)"
          }else if (modeIcon=='moon') {// dark mobile image
            console.log(modeIcon + '-moon modeIcon mobile');
            document.getElementById('container-status').style.backgroundColor=darkMode
            //att.style.color=darkMode;
            document.getElementById('box_stat').style.backgroundColor=darkMode
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-dark.jpg)"
          }
  } else {    //desktop background
          if (modeIcon=='sun') {
            console.log(modeIcon + '-sun modeIcon desktop');
            att.style.color=darkMode;
            document.getElementsByTagName('a')[5].style.color=darkMode
            document.getElementsByTagName('a')[6].style.color=darkMode
            document.getElementById('container-status').style.backgroundColor=lightMode
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-light.jpg)"
          }else if (modeIcon=='moon') {
            att.style.color=lightMode;
            console.log(modeIcon+ '- modeIcon desktop');
            document.getElementsByTagName('a')[5].style.color=lightMode
            document.getElementsByTagName('a')[6].style.color=lightMode
            document.getElementById('container-status').style.backgroundColor=darkMode
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-dark.jpg)"
          }
        }
}

// set background for different screen width and modeIcon(sun or dark modeIcon)
function myFunction(x,modeIcon) {

  if (x.matches) { // If media query matches
    //check if elements already exist to avoid duplication
    if (document.getElementById('tag_clear')!=null) {
          document.getElementById('tag_comp').remove()
          document.getElementById('tag_active').remove()
          document.getElementById('tag_clear').remove()
          document.getElementById('tag_count').remove()
        }
    width_less();
    document.getElementById('tag_all').style.display='inline'
    document.getElementById('tag_active').style.display='inline'
    document.getElementById('tag_comp').style.display='inline'

    //mobile background
          if (modeIcon=='sun') {
            // light mobile image
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-light.jpg)"
          }else if (modeIcon=='moon') {
            // dark mobile image
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-mobile-dark.jpg)"
          }

  } else {
      if (document.getElementById('box_stat')!=null) {
        document.getElementById('box_stat').remove()
        document.getElementById('p_counts').remove()
        document.getElementById('p_clear').remove()
      }
      width_greater();
      document.getElementById('tag_clear').style.display='inline'
      document.getElementById('tag_count').style.display='inline'
      document.getElementById('tag_all').style.display='inline'
      document.getElementById('tag_active').style.display='inline'
      document.getElementById('tag_comp').style.display='inline'

    //desktop background
          if (modeIcon=='sun') {
            console.log(modeIcon + ' modeIcon desktop');
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-light.jpg)"
          }else if (modeIcon=='moon') {
            console.log(modeIcon+ ' modeIcon desktop');
            document.getElementById('bg').style.backgroundImage="url(/todo-app-main/images/bg-desktop-light.jpg)"
          }
        }
}

// create new item
function createNewDo(item){

    let wrapper = document.getElementsByClassName('container-new')[0];
    // create a new item inside a div(wrapper)
     box = document.createElement('div');//sub container
     ul_todo = document.createElement('ul');
     li_circle = document.createElement('li');
     p1 = document.createElement('p');//cicle
     li_item = document.createElement('li');
     p2 = document.createElement('p');//todo item
     li_cross = document.createElement('li');
     img_cross = document.createElement('img');
     br = document.createElement('br');
     img_check = document.createElement('img');

    // forming unique attribute names with counting number for each item added
     list_ovals = count; // circle icon
     lists = 'lists_'+count; // todo item
     cross = 'cross_'+count; // cross
     boxes = 'box_'+count; // div containing circle and todo item
     li_cir = 'cir_'+count;
     li_txt = 'txt_'+count;
     li_crs = 'crs_'+count;
     check_count = 'check_'+count

    p1.setAttribute('class', list_ovals);
    p2.setAttribute('class', lists);
    box.setAttribute('draggable', true);
    box.setAttribute('class', 'boxes');
    img_cross.setAttribute('class', cross);
    img_cross.setAttribute('src', "/todo-app-main/images/icon-cross.svg");
    box.setAttribute('id', boxes);
    li_circle.setAttribute('class', li_cir);
    li_item.setAttribute('class', li_txt);
    li_cross.setAttribute('class', li_crs);
    ul_todo.setAttribute('class','ul_td')
    img_check.setAttribute('class', check_count)
    img_check.setAttribute('src', "/todo-app-main/images/icon-check.svg")

    // append children
    wrapper.appendChild(box);
    box.appendChild(ul_todo);
      ul_todo.appendChild(li_circle);
        li_circle.appendChild(p1);
      ul_todo.appendChild(li_item);
        li_item.appendChild(p2);
      ul_todo.appendChild(li_cross);
        li_cross.appendChild(img_cross);
    p2.textContent = item; // the todo item
    box.appendChild(br);

    document.getElementsByClassName('ul_td')[count].style.paddingLeft='0px'
    // circle shaped icon (MADE FROM A PARAGRAGH)
        let circle = document.getElementsByClassName(list_ovals)[0];
        circle.setAttribute('style','text-align: center')
        circle.style.borderRadius = '50%'
        circle.style.justifyContent = 'center';
        circle.style.alignItems = 'center';
        circle.style.height = '14px';
        circle.style.width = '14px';
        circle.style.border = '1px solid hsl(240deg 6.21% 65.29%)';
        circle.style.marginLeft = '2px';
        circle.style.marginBlockEnd = 0;
        circle.style.marginBlockStart = 0;
        circle.style.marginTop = '10px';
        circle.style.display = 'inline-block';

        let todos = document.getElementsByClassName(lists)[0];
        todos.style.marginBlockEnd = 0;
        todos.style.marginBlockStart = 0;
        todos.style.marginTop = '10px';
        todos.style.width='80%'
        todos.style.display = 'inline-block';

        let crss = document.getElementsByClassName(cross)[0];
        crss.style.marginBlockEnd = 0;
        crss.style.marginBlockStart = 0;
        crss.style.marginTop = '10px';
        crss.style.display = 'inline-block';

        let newItem = document.getElementsByClassName('container-new')[0];
        newItem.style.height='30px';
        newItem.style.borderTopRightRadius = '4px';
        newItem.style.borderTopLeftRadius = '4px';

        var newBox = document.getElementById(boxes);
        newBox.style.backgroundColor = darkMode;
        newBox.style.height='35px';
        newBox.style.paddingBlockEnd='5px';
        newBox.style.marginBottom='0.5px';
        newBox.style.borderTopRightRadius = '2px'
        newBox.style.borderTopLeftRadius = '2px'
        newBox.style.borderBottom ='1px solid hsl(240deg 6.21% 65.29%)'

      document.getElementsByClassName(li_cir)[0].style.display='inline'
      document.getElementsByClassName(li_txt)[0].style.display='inline'
      document.getElementsByClassName(li_crs)[0].style.display='inline'

    var bx = document.getElementsByClassName('boxes');
    var box_len = document.getElementsByClassName('boxes').length
    count++;
    newCount = count
      // TODO: get all the boxes and set their bacground color as one
    if (modeIcon=='sun') {
      for (var i = 0; i <= box_len; i++) {
        if (bx[i]!=undefined) {
          bx[i].style.backgroundColor = lightMode;
        }
      }
    }else if (modeIcon=='moon') {
      for (var i = 0; i <= box_len; i++) {
        if (bx[i]!=undefined) {
          bx[i].style.backgroundColor = darkMode;
        }
      }
    }
    //update item count for different screen width
    rem = 0;
    add = 0;
    if (document.getElementById('p_counts')==null) {holder = 'greater';
    }else {holder = 'lesser';}

    // get all the boxes and set their background color as one
    // but some class names change from boxes to complete
    if (document.getElementsByClassName('boxes').length!=0) {
        for (var i = 0; i < document.getElementsByClassName('boxes').length; i++) {
            let bx = document.getElementsByClassName('boxes');
              if (modeIcon=='sun') {
                bx[i].children[0].children[1].style.color = darkMode
              }else {
                bx[i].children[0].children[1].style.color = lightMode
              }

              if ( bx[i] == undefined) {//if box is removed
                let bc = document.getElementsByClassName('complete');
                if (modeIcon=='sun') {
                  bc[i].children[0].children[1].style.color = darkMode
                }else {
                  bc[i].children[0].children[1].style.color = lightMode
                }
            }
          }
      }

    updateCounter(rem,add,holder);

    console.log(count +' count');
    addEventsDragAndDrop(box);

    //moving other contents down as list expands
    switch (count) {
      case 1:
        document.getElementsByClassName('container-new')[0].style.minHeight = '40px'
      break;

      case 2:
        document.getElementsByClassName('container-new')[0].style.minHeight = '80px'
      break;

      case 3:
        document.getElementsByClassName('container-new')[0].style.minHeight = '120px'
      break;

      case 4:
        document.getElementsByClassName('container-new')[0].style.minHeight = '160px'
      break;

      case 5:
        document.getElementsByClassName('container-new')[0].style.minHeight = '200px'
      break;

      case 6:
        document.getElementsByClassName('container-new')[0].style.minHeight = '240px'
      break;

      // create a scrollable list that does not exceed 7 items before it scrolls
      case 7:
        var vv=document.getElementsByClassName('container-new')[0]
        vv.style.minHeight = '300px'
        vv.style.overflow='scroll'
      break;

      default:

    }

    //add addEventListener to circles formed from PARAGRAGH
      let pp = document.getElementsByClassName(list_ovals)[0];
      pp.addEventListener("click", event => {
      var class_num = pp.className;// get number attached to each cicle
      pp.style.visibility = 'hidden'
      pp.style.display = 'none'
      //remove()
      console.log('circle clicked');
      createCheck(count,class_num)
      event.preventDefault();
     });

     //add addEventListener to cross
      removeItem()
}

  //add addEventListener to All
  function getAll(){
    let all_tag = document.getElementById('tag_all').children[0]
    all_tag.addEventListener("click",event=>{
      console.log(count+' items ALL test');

      //iterate through list and set all hidden items visible
      for (var i = 0; i < count; i++) {
        var vBox = document.getElementsByClassName('container-new')[0].children[i]//box-inline
        let vUl = document.getElementsByClassName('container-new')[0].children[i].children[0]//ul-inline
        let vCir = vUl.children[0]//cir
        let vTxt = vUl.children[1]//txt
        let vCrs = vUl.children[2]//crs
        let vP = vTxt.children[0]//p-inline block

        vBox.style.visibility = 'visible'
        vBox.style.display = 'inline'
        vBox.style.backgroundColor = darkMode;
        vBox.style.height='35px';
        vBox.style.paddingBlockEnd='5px';
        vBox.style.borderTopRightRadius = '2px'
        vBox.style.borderTopLeftRadius = '2px'
        vBox.style.borderBottom ='1px solid hsl(240deg 6.21% 65.29%)'

        vUl.style.display = 'inline'

        vCir.style.display = 'inline'
        vCir.setAttribute('style','text-align: center')
        vCir.style.height = '14px';
        vCir.style.width = '14px';
        vCir.style.marginLeft = '2px';
        vCir.style.marginBlockEnd = 0;
        vCir.style.marginBlockStart = 0;
        vCir.style.marginTop = '5px';
        vCir.style.display = 'inline-block';

        vTxt.style.display = 'inline'
        vTxt.style.marginBlockEnd = 0;
        vTxt.style.marginBlockStart = 0;
        vTxt.style.marginTop = '5px';
        vTxt.style.width='80%'
        vTxt.style.display = 'inline-block';

        vCrs.style.display = 'inline'
        vCrs.style.marginBlockEnd = 0;
        vCrs.style.marginBlockStart = 0;
        vCrs.style.marginTop = '5px';
        vCrs.style.display = 'inline-block';

        vP.style.display = 'inline-block'

        list_ovals = i // circle icon
        lists = 'lists_'+i // todo item
        cross = 'cross_'+i // cross
        boxes = 'box_'+i // div containing circle and todo item
        li_cir = 'cir_'+i
        li_txt = 'txt_'+i
        li_crs = 'crs_'+i
        check_count = 'check_'+i

        let newItem = document.getElementsByClassName('container-new')[0];
        newItem.style.height='30px';
        newItem.style.borderTopRightRadius = '4px';
        newItem.style.borderTopLeftRadius = '4px';

        document.getElementsByClassName(li_cir)[0].style.display='inline'
        document.getElementsByClassName(li_txt)[0].style.display='inline'
        document.getElementsByClassName(li_crs)[0].style.display='inline'

        if (document.getElementsByClassName('boxes')[i]!=undefined) {
          document.getElementsByClassName('boxes')[i].style.paddingRight = '5px'
          document.getElementsByClassName('boxes')[i].style.paddingTop = '9px'
          document.getElementsByClassName('boxes')[i].style.paddingRight = '60px'
        }

        if (document.getElementsByClassName('complete')[i]!=undefined) {
          document.getElementsByClassName('complete')[i].style.paddingTop = '9px'
          document.getElementsByClassName('complete')[i].style.paddingRight = '75px'
          document.getElementsByClassName('complete')[i].style.paddingRight = '2px'
        }

      }

      event.preventDefault();
    });
  }

  //add listener to active tasks
  function getActive(){
  let active_tag = document.getElementById('tag_active').children[0]
  active_tag.addEventListener("click",event=>{

    if (count!=0) {
      //check for boxes with class 'complete'
      let lenC = document.getElementsByClassName('complete').length
      //hide 'complete' boxes
          for (var i = 0; i < lenC; i++) {
            document.getElementsByClassName('complete')[i].style.visibility = 'hidden'
            document.getElementsByClassName('complete')[i].style.display = 'none'
            console.log(i);
          }
      }else {
        console.log('no active todos');
      }

    if (windowWidth == 'greater') {
            document.getElementsByTagName('a')[0].textContent= itemsActive + ' items active';
    }else if (windowWidth == 'lesser') {
            p_counts.textContent = (itemsActive+' items active');
    }
    event.preventDefault();
  });
}

  function getCompleted(){
  let comp_tag = document.getElementById('tag_comp').children[0]
  comp_tag.addEventListener("click",event=>{
    console.log(count+' all test');

    if (count!=0) {
      let lenC = document.getElementsByClassName('complete').length
      let lenB = document.getElementsByClassName('boxes').length
      //hide 'complete' boxes
          for (var i = 0; i < lenC; i++) {
            document.getElementsByClassName('complete')[i].style.visibility = 'visible'
            document.getElementsByClassName('complete')[i].style.display = 'inline'
            console.log(i);
          }

          for (var i = 0; i < lenB; i++) {
            document.getElementsByClassName('boxes')[i].style.visibility = 'hidden'
            document.getElementsByClassName('boxes')[i].style.display = 'none'
          }

      }else {
        console.log('no active todos');
      }

    event.preventDefault();
  });
}

  function clearCompleted(){
    var clear_all;
    if (document.getElementById('tag_clear')!=null) {
      clear_all = document.getElementById('tag_clear').children[0]
    }else {
      clear_all = document.getElementById('p_clear')
    }
  clear_all.addEventListener("click",event=>{
  console.log(count+' all test');


        if (count!=0) {
          let lenC = document.getElementsByClassName('complete').length
          //hide 'complete' boxes
              for (var i = 0; i <= lenC; i++) {
                console.log(i+' cleared');
                document.getElementsByClassName('complete')[i].remove()
              }

          }else {
            console.log('no active todos');
          }

    event.preventDefault();
  });
}

  function removeItem(){
  //add addEventListener to cross
    var cross_num;
    let cross_var = document.getElementsByClassName(cross)[0];

    cross_var.addEventListener("click", event => {
    var c_num = cross_var.className;// get number attached
    if (c_num.charAt(7)!='') {
      cross_num = c_num.charAt(6)+c_num.charAt(7);
      document.getElementById('box_'+cross_num).remove()
      console.log('removed '+cross_num);
    }else {
      cross_num = c_num.charAt(6);
      document.getElementById('box_'+cross_num).remove()
      console.log('removed '+cross_num);
    }

    count = count - 1;
    newCount = count;
    rem = 1
    add = 0
    updateCounter(rem,add,newCount)

    //reassign new ids and classses list
    for (var i = cross_num; i <= count; i++) {
      if (document.getElementById('box_'+i)!=null) {
        var changeboxId = document.getElementById('box_'+i)
        changeboxId.setAttribute('id','box_'+(i-1))
      }

      if (document.getElementsByClassName('cir_'+i)[0]!=null) {
        var changeListClass = document.getElementsByClassName('cir_'+i)[0]
        changeListClass.setAttribute('class','cir_'+(i-1))
      }

      if (document.getElementsByClassName('txt_'+i)[0]!=null) {
        var changeListClass = document.getElementsByClassName('txt_'+i)[0]
        changeListClass.setAttribute('class','txt_'+(i-1))
      }

      if (document.getElementsByClassName('crs_'+i)[0]!=null) {
        var changeListClass = document.getElementsByClassName('crs_'+i)[0]
        changeListClass.setAttribute('class','crs_'+(i-1))
      }

      if (document.getElementsByClassName(i)[0]!=null) {
        var changeListClass = document.getElementsByClassName(i)[0]
        changeListClass.setAttribute('class',(i-1))
      }

      if (document.getElementsByClassName('cross_'+i)[0]!=null) {
        var changeListClass = document.getElementsByClassName('cross_'+i)[0]
        changeListClass.setAttribute('class','cross_'+(i-1))
      }

      if (document.getElementsByClassName('lists_'+i)[0]!=null) {
        var changeListClass = document.getElementsByClassName('lists_'+i)[0]
        changeListClass.setAttribute('class','lists_'+(i-1))
        }
      }
    event.preventDefault();
      });
}

  var holder = 0;//holds count or width
  function updateCounter(rem,add,holder){

    //update item counting when width changes
    if ( rem == 1 && add == 0) {
        console.log(holder+' items after removal');
              if (windowWidth == 'greater') {
                      document.getElementsByTagName('a')[0].textContent=(holder+' items left');
              }else {
                      p_counts.textContent = (holder+' items left');
              }
    }else if ( add==1 && rem == 0) {
        holder = holder + 1;
        if (windowWidth == 'greater') {
                document.getElementsByTagName('a')[0].textContent=(holder+' items left');
        }else {
                p_counts.textContent = (holder+' items left');
        }
        console.log('Counter '+holder);
    }else if (add==0 && rem == 0) {
      //update item counting when width changes
            if (holder == 'greater') {
                  if (newCount==0) {// if no items are added
                    document.getElementsByTagName('a')[0].textContent=('No items added');
                  }else {
                    document.getElementsByTagName('a')[0].textContent=(count+' items left');
                  }
            }else {
                  if (newCount==0) {// if no items are added
                    p_counts.textContent = ('No items added');
                  }else {
                    p_counts.textContent = (count+' items left');
                  }
            }
          }

  }

  // checks complete todos
  function createCheck(count,num){
    var cnt = count;
    console.log(num+' console.log()');
    if (document.getElementsByClassName(num)[0].style.visibility=='hidden') {
      var cc = num;// number attached to each cicle
      console.log('item '+cc +' checked');
      var lc = document.getElementsByClassName('cir_'+cc)[0]
      lc.appendChild(img_check)
      img_check.setAttribute('style','text-align: center')
      img_check.style.width='15px'
      img_check.style.height='15px'
      img_check.style.borderRadius = '40%'
      lc.style.backgroundColor='linear-gradient hsl(192, 100%, 67%)'
      img_check.style.paddingLeft = '2px';
      img_check.style.border = '0.5px solid hsl(240deg 6.21% 65.29%)';
      img_check.style.marginLeft = '2px';
      img_check.style.marginBlockEnd = 0;
      img_check.style.marginBlockStart = 0;
      img_check.style.marginTop = '10px';
      img_check.style.display = 'inline-block';
      }

    console.log(cnt+' count click '+ 'on element at '+cc);
    document.getElementsByClassName('lists_'+cc)[0].style.textDecoration = 'line-through'

    //assign new classes(complete)
    var bx;
    if (lc.parentElement.parentElement!=undefined) {
      // get parent container(boxes)
      var bx = lc.parentElement.parentElement
      bx.setAttribute('class','complete')
    }
    checked++;
    console.log(checked +' checked')
    itemsActive = cnt-checked
  }

  var btn = document.querySelector('.add');
  var remove = document.querySelector('.draggable');

  function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };

  function dragEnter(e) {
    this.classList.add('over');
  }

  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dragDrop(e) {
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }

  function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
  }

  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });

  function mySearch() {
    // Declare variables
    console.log('searching');
    var input_search, filter, ul, cir_li, txt_li, crs_li, p, txtValue , itm;
    input_search = document.getElementById('todo_input');
    // get current text in search form and convert to UpperCase
    // to get rid of case sensitivity when searching
    filter = input_search.value.toUpperCase();
    ul = document.getElementsByClassName('ul_td');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < ul.length; i++) {
      const itemHTML = (itm) => '<li>${itm}</li>';
      var renderHTML = '';

      cir_li = document.getElementsByClassName('cir_'+i)[0]
      txt_li = document.getElementsByClassName('txt_'+i)[0]
      crs_li = document.getElementsByClassName('crs_'+i)[0]

      if (txt_li.getElementsByTagName("p")[0]!=undefined) {
        p = txt_li.getElementsByTagName("p")[0];
        txtValue = p.textContent || p.innerText; // get texts
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          renderHTML += itemHTML(itm);
          crs_li.style.display='inline'
          txt_li.style.display='inline'
          cir_li.style.display='inline'

        } else {
          txt_li.style.display = "none";
          // get first container ul_td
          let n = txt_li.getAttribute('class')
          var ul_r = document.getElementsByClassName(n)[0].parentElement.attributes[0].nodeValue
          // hide div container for other items
          let c2 = document.getElementsByClassName(ul_r)[i]
          let cls = c2.parentElement.attributes[2].nodeValue
          console.log(cls);
          document.getElementById(cls).style.visibility = 'hidden'
          document.getElementById(cls).style.display = "none";
        }
      }
    }
  }