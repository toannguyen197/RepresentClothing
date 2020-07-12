function DomID(id){
    return document.getElementById(id);
}
function TangDan(){
    var priceElement=document.getElementsByClassName('money');
    for(let i=0;i<priceElement.length;i++){
            for ( var j = i + 1; j < priceElement.length; j++){
            //Bỏ chữ đ sau giá tiền
            if (parseFloat(priceElement[i].innerText.replace('đ','')) > parseFloat(priceElement[j].innerText.replace('đ',''))){
                var temp = priceElement[i].parentElement.parentElement.innerHTML
                priceElement[i].parentElement.parentElement.innerHTML = priceElement[j].parentElement.parentElement.innerHTML;
                priceElement[j].parentElement.parentElement.innerHTML = temp;
            }
            }
    }
}
function GiamDan(){  
    var priceElement=document.getElementsByClassName('money');
    for(let i=0;i<priceElement.length;i++){
            for ( var j = i + 1; j < priceElement.length; j++){
            //Bỏ chữ đ sau giá tiền
            if (parseFloat(priceElement[i].innerText.replace('đ','')) < parseFloat(priceElement[j].innerText.replace('đ',''))){
                var temp = priceElement[i].parentElement.parentElement.innerHTML
                priceElement[i].parentElement.parentElement.innerHTML = priceElement[j].parentElement.parentElement.innerHTML;
                priceElement[j].parentElement.parentElement.innerHTML = temp;
            }
            }
    }
}
DomID('Price').addEventListener('change', () => {
    var selectedSanPham = DomID('Price').value;
    if (selectedSanPham == 'price-ascending') {
        TangDan();
        Dathang();
    }
    else if (selectedSanPham == 'price-descending') {
        GiamDan();
        Dathang();
    }
    else if (selectedSanPham == 'manualPrice'){
        
    }
});
DomID('countStore').innerHTML=0;

var product=document.getElementsByClassName('product-title');
    var tongTien=0;
    DomID('TotalMoney').innerHTML=tongTien+'đ';

  var imgs=[];
  var titles=[];
  var prices=[];
  var numbers=[];

function Dathang(){
  for(let i=0;i<product.length;i++){
        var button=document.getElementsByClassName('button-buy');
        button[i].addEventListener('click',()=>{
            var product=button[i].parentElement.parentElement;
            var title=product.getElementsByClassName('product-title')[0].innerText;
            var img=product.getElementsByTagName('img')[0].src;
            var price=product.getElementsByClassName('money')[0].innerText;
            var number=product.getElementsByClassName('product-nmber')[0].value;
            var titleBuy=document.getElementsByClassName('buy-title');
            console.log(title);
            console.log(img);
            console.log(price);
            console.log(number);
            tongTien +=parseInt(price.replace('đ',''));

            if (tongTien < 1000){
                DomID('TotalMoney').innerHTML = tongTien + '.000đ';
            }
            else
            {
                var tempTien = tongTien.toString();
                var tongTienTrieu = "";
                for (var j = 0 ; j < tempTien.length; j++){
                    if (j == 1){
                        tongTienTrieu += "." + tempTien[j];
                        continue;
                    }
                    tongTienTrieu += tempTien[j];
                }
                DomID('TotalMoney').innerHTML = tongTienTrieu + '.000đ';
            }

            if (titleBuy.length > 0) {
                let flag = false;
                for (let i = 0; i < titleBuy.length; i++) {
                    if (titleBuy[i].innerText === title) {
                        flag = true;
                        numbers[i]=Number(++numbers[i]);
                    }
                }
                    if (flag===false) {
                        titles.push(title);
                        imgs.push(img);
                        prices.push(price);
                        numbers.push(number);

                    }
                }
            else {
                titles.push(title);
                imgs.push(img);
                prices.push(price);
                numbers.push(number);
            }

            renderHTML();
        })
  }
}

    Dathang();

  function renderHTML() {
    var count =0;
     var sanpham = "";
     for (let i = 0; i < titles.length; i++) {
        sanpham+= '<li class="show-SanPham"><img src="'+imgs[i]+'"alt=><div class="buy-title"><h4>'+titles[i]+'</h4></div><input type="text" value="'+numbers[i]+'" class="qual-buy" disabled><div class="buy-price"><p>x '+prices[i]+'</p></div><a class="delete" onclick="xoahang('+i+ ')">x</a></li>';
        count+=Number(numbers[i]);

     }
     //tongTien = Number(prices.replace('đ',''));
     DomID('countStore').innerHTML=count;
     DomID('showSanPham').innerHTML=sanpham;

    }

     function xoahang(n){    
        var x=document.getElementsByClassName('buy-title');
        tongTien= tongTien -  parseFloat(prices[n].replace('đ','')) * Number(numbers[n]);
        DomID('TotalMoney').innerHTML = tongTien + '000đ';
        if (tongTien < 1000){
            DomID('TotalMoney').innerHTML = tongTien + '.000đ';
        }
        else
        {
            var tempTien = tongTien.toString();
            var tongTienTrieu = "";
            for (var j = 0 ; j < tempTien.length; j++){
                if (j == 1){
                    tongTienTrieu += "." + tempTien[j];
                    continue;
                }
                tongTienTrieu += tempTien[j];
            }
            DomID('TotalMoney').innerHTML = tongTienTrieu + '.000đ';
        }
        if(tongTien===0){
            DomID('TotalMoney').innerHTML = tongTien + 'đ';
        }
        for (let i = 0; i < x.length; i++) {
                if (titles[i] === x[n].innerText) {
                    console.log();
                    titles.splice(i, 1);
                    imgs.splice(i,1);
                    prices.splice(i,1);    
                    numbers.splice(i,1);                                                 
                }
            }

            renderHTML();
    }