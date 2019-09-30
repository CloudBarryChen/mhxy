(function () {
  console.log(1)
  console.log($('.tab-target tr td:nth-of-type(2)'))

  var abs = [];



  $('.tab-target tr td:nth-of-type(2)').each(function (index, item) {
    var obj = {
      name: this.innerText,
      imgUrl: 'images/ablities/' + ++index + '.jpg'
    }
    abs.push(obj);
  })
  console.log(abs);

  $.ajax({
    type: 'POST',
    url: '/abs',
    data: { abs: JSON.stringify(abs) },
    headers: {
      'enctype': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res)
    }
  })

})()