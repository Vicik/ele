$('.btn').click(function(e){
    e.preventDefault();
    var cid = $('select option:selected').val();
    var aName = $('#search').val();
    sessionStorage['cid'] = cid;
    sessionStorage['aName'] = aName;
    location.href = 'seller.html';
})
