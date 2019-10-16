
$('#abilityArea').click(function (e) {
  if (e.target.tagName === 'IMG') {
    // console.log(e.target.src)
    // console.log(e.target.alt)
    var src = e.target.src;
    var alt = e.target.alt;
    $('#panel').append(`<img src=${src} alt=${alt}>`);

    searchShow(getAbs());
  }
})

$('#panel').click(function (e) {
  if (e.target.tagName === 'IMG') {
    $(e.target).remove();
    searchShow(getAbs());
  }
})

$('#clearAbs').click(function (e) {

  $('#panel img').remove();
  searchShow(getAbs());

})

$('#sub').click(function (e) {
  if (confirm('确定提交数据？')) {
    var abs = getAbs();
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

    //保存召唤兽数据
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
  }

})

//筛选数据 事件委托
function searchShow(abs) {

  $.ajax({
    url: '/bbsmatch',
    data: {
      abs: JSON.stringify(abs)
    },
    success: function (res) {
      // console.log(res)
      var str = getAbsIcons(abs);
      var _html = `<tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        ${str}（你的）
      </td>
  </tr>`;
      res.forEach(element => {

        var str = getAbsIcons(element.abilities);

        _html += `<tr>
      <td>${element.name}</td>
      <td>${element.fiveElements}</td>
      <td>${element.source}</td>
      <td>${element.certification}</td>
      <td>
        ${str}
      </td>
  </tr>`
      });

      $('#inTable').html(_html);
    }
  })
}

//缓存技能数据
let abslab;
(function () {


  if (!localStorage.getItem('abslab')) {
    $.ajax({
      url: '/abslab',
      success: function (res) {
        localStorage.setItem('abslab', JSON.stringify(res))
        abslab = res;
      }
    })
  }
  abslab = JSON.parse(localStorage.getItem('abslab'));

  // console.log(abslab)

})()

function getAbsIcon(abs) {
  return abslab.find((item) => {
    return item.name === abs;
  })
}

function getAbsIcons(abs) {
  var str = '';
  abs.forEach((item) => {
    var ab = getAbsIcon(item);
    // console.log(item)
    str += `<img src=${ab.imgUrl} alt=${ab.name}>`;
  })

  return str;
}

function getAbs() {
  var abs = [];
  $('#panel img').each(function (index, item) {
    abs.push(this.alt);
  })
  return abs;
}

/* $('#searchRow').change(function (e) {

  var abs = [];


  $('.searchAbs').each(function () {
    // console.log(this.value)
    abs.push(this.value);
  });
  // console.log(abs);

  $.ajax({
    url: '/bbsmatch',
    data: {
      abs: JSON.stringify(abs)
    },
    success: function (res) {
      // console.log(res)
      var _html = '';
      res.forEach(element => {
        _html += `<tr>
      <td>${element.name}</td>
      <td>${element.fiveElements}</td>
      <td>${element.source}</td>
      <td>${element.certification}</td>
      <td>
        ${element.abilities}
      </td>
  </tr>`
      });

      $('#inTable').html(_html);
    }
  })

  //动态添加技能筛选节点
  // console.log($('.searchAbs').last().val() !== '')
  if ($('.searchAbs').last().val() !== '') {
    $('#searchBar').append($('.searchAbs').last().clone(true))
  }
}) */
