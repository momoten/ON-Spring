function GetQueryString()
{
    var result = {};
    
    if( 1 < window.location.search.length )
    {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring( 1 );

        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            // パラメータ名をキーとして連想配列に追加する
            result[ paramName ] = paramValue;
        }
    }
    return result;
}

//空の配列宣言
var neighborhoods = [" "];
var visitno=[" "];
var visitinfo=[" "];
var visiturl=[" "];
//var visitlist=[" "];

//CSVファイルの読み込み	
$(function() {
  var csvList;
  var target = '#visitlist';
  var insert = '';
  var place=[" "];
  htmldata='';
  $.ajax({
    url: './data/aaa.csv',
    success: function(data) {
    
      // csvを配列に格納
      csvList = $.csv()(data);
      
      htmldata=GetQueryString();
      place.push(String(htmldata['data']));


      var placeno=place[1];

      window.onload = function onLoad() {
        target = document.getElementById('#spaname');
        target.innerHTML = csvList[1][2];
      }


      
       for (var i = 1; i < csvList.length-1; i++) {
       	if(csvList[i][3]== place[1]){
       			insert += '<div class="box_CSS3">';
                insert += '<li id="' + csvList[i][0] + '">';
                insert +=  '名前　　' + csvList[i][2]+ '(' + csvList[i][1] + ')'+'<br>';
                insert +=  '市　　  　' + csvList[i][3]+'<br>';
                insert +=  '説明'+'<br>';
                insert +=  '→' + csvList[i][4]+'<br>';
                insert +=  '効果'+'<br>';
                insert +=  '→' + csvList[i][5]+'<br>';
                insert +=  '<br>';
                /*insert +=  csvList[i][2]+'(' + csvList[i][1] + ')' + '<br>'+ csvList[i][3]+'<br>'+ csvList[i][4]+'<br>'+ csvList[i][5];*/
                insert += '</li>';
                insert += '</div>';
          }
            };
            $(target).append(insert);
    }
  });
});
