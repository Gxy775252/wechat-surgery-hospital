<template>
  <div>
   
	 <!-- <div class="img_div" id="div6">
    < img class="imgBackground" src="{{$banner['pic3'] or null}}" id="idImg3">
    < img data-mydata="3" class="del" src="img/del.jpg"/>
    <input type="file" class="a" id="uploaddiy3" name="uploadFile3" onchange="changeUpload1('uploadFile3','idImg3')"/>
</div>
	 
	 
	 
	 function changeUpload1(_uploadName, _idImg) {
    idImg = _idImg;
    $("#uploadName").val(_uploadName);
    var formData = new FormData($("#form")[0]);

    myAjax_formdata("{{url('pc/uploadPic')}}", formData,
        onFileupload1);
}

function onFileupload1(res) {
    console.log('res', JSON.stringify(res.url));
    if (res.flag) {
        $("#" + idImg).attr("src", res.url)

    } else {
        layer.msg(res.msg);
    }
}

<form class="form form-horizontal" id="form" method="post" enctype="multipart/form-data">
	 
	 
	 
	 function myAjax_formdata(url, data, successFunc) {
    $.ajax({
        "url": url,
        "data": data,
        "dataType": "json",
        "type": "post",
        "async": false,
        "cache": false,
        "processData": false,
        "contentType": false,
        "error": function (XMLHttpRequest, textStatus) {
            alert(XMLHttpRequest.status + "||" + XMLHttpRequest.readyState
                + "||" + textStatus);// 200 4 parseerror
        },
        "success": function (response) {
            successFunc(response);
        }
    });
}
	 -->
	 
	 
  </div>
</template>
<script>
</script>
<style scoped>
</style>
