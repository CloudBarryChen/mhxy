
const getBBList = function () {

  var bbName = $('#bbName').val();
  var bbLevel = $('#bbLevel').val();

  // console.log(bbName)
  if (bbName === '' || bbLevel === '' || parseInt(bbLevel) % 5 !== 0) {
    alert('格式不正确！')
    return;
  }

  $.ajax({
    url: '/bbs',
    data: {
      bbName,
      bbLevel
    },
    success: function (res) {
      console.log(res)
    }
  })
}

$('#bbSub').click(() => {
  getBBList();
})