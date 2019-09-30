
$('#abilityArea').click(function (e) {
  if (e.target.tagName === 'IMG') {
    // console.log(e.target.src)
    // console.log(e.target.alt)
    var src = e.target.src;
    var alt = e.target.alt;
    $('#panel').append(`<img src=${src} alt=${alt}>`);
  }
})

$('#panel').click(function (e) {
  if (e.target.tagName === 'IMG') {
    $(e.target).remove();
  }
})

$('#clearAbs').click(function (e) {
  $('#panel img').remove();
})

$('#sub').click(function (e) {
  var abs = [];
  $('#panel img').each(function (index, item) {
    abs.push(this.alt);

  })
  console.log(abs);

  var bbName = $('#bbName').val();
  var bbFE = $('#bbFE').val();
  var source = $('#source').val();
  var certification = $('#certification').val();

  if (abs.length === 0) {
    alert("技能不能为空！");
    return;
  }

  var obj = {
    bbName,
    bbFE,
    source,
    certification,
    abilities: abs,
  }

  console.log(obj)

  $.ajax({
    type: 'POST',
    url: '/bbmodel',
    data: {
      obj: JSON.stringify(obj)
    },
    headers: {
      'enctype': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res)
      alert('数据插入成功！')
    }
  })
})