var jsondata;
var ssobj=[];
var ssurl = 'https://docs.google.com/spreadsheets/d/1vdybjC94vuR6dGZOvVaDIPqV-rx0r3AGxrK1DWOnWIg/gviz/tq?tqx=out:json&gid=0';
var str='';
var i=0;

function preload(){
  // 取得 spreadsheet
  $.ajax({url: ssurl, type: 'GET', dataType: 'text'})
    .done((data)=> {
      // 去除多餘的表頭資料
      const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
      if (r && r.length == 2) {
        const obj = JSON.parse(r[1]);
        // obj 即為 spreadsheet 裡資料
        console.log(obj);
        
        // !!!!! APIV4 change json object order !!!!
        // obj.table.cols.c[n].label > 各欄位名
        // obj.table.rows.c[n].v > 各列名
        
        // 整理為一個json格式
        obj.table.rows.forEach((robj)=>{
          let roweach = {};
          obj.table.cols.forEach((l,i)=>{
            roweach[l.label]=robj.c[i].v;
          });
          ssobj.push(roweach);
        });
      }
      console.log(ssobj);
    
      let str='';
      // 把所有name的資料抓出來 排在燈箱上
      ssobj.forEach((o,i)=>{
        str += '<div class="slide-'+i+'">'+
          //###圖 <img></img>
      '<img style="display:block; margin:auto;"id="'+o.pic+'"src="./assets/'+o.pic+'.png"class="img-fluid"></img>'+
          //### 超連結文字 <a><p>...</p></a>
          '<a href="'+o.url+'"target="_blank">'+
              '<p style="text-align:center;">'+o.link+'</p>'+
          '</a>'+
        '</div>';
      });
      console.log(str);
      // 使用 padding 加入 圖片間的間隔
      $('#hw1').html(str);
      $('#task').html('按一下');
       //將演算的資料 str 插入 index 裡面 id= hw1 的 tag 物件
     $('#hw1').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
    });
}



function mouseReleased(){
  let straa='按一下 '+i+' >_0'
  if (i%2==0){
    straa='請繼續 '+i+' 0_<';
    $('#task').css("background-color","Cornsilk");
  }else{
    $('#task').css("background-color","AliceBlue");
  }
  $('#task').html(straa);
  
  i=i+1
}

function setup() {

  
  
  
}

function draw() {
  
  
}