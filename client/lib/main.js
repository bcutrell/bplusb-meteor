$(document).ready(function() {
  startPictureGallery();
  weddingParty();

  $("#noteText").keyup(function(){
    $("#noteCount").text("Characters left: " + (200 - $(this).val().length));
  });

  $("#dietText").keyup(function(){
    $("#dietCount").text("Characters left: " + (200 - $(this).val().length));
  });
});

function startPictureGallery() {
  var temp = "<div class='brick' style='width:{width}px;'><a href='/gallery/INDEX.jpg' data-lightbox='all-pics'><img class='desaturate' src='/gallery/INDEX.jpg' width='100%'></a></div>";
    // limitItem is the number of images in the img folder
    var w = 1, h = 1, html = '', limitItem = 29;
    for (var i = 0; i < limitItem; ++i) {
      w = 1 + 3 * Math.random() << 0;
      html += temp.replace(/\{width\}/g, w*150).replace(/INDEX/g, i );
    }

  $("#pictureGallery").html(html);
  var wall = new freewall("#pictureGallery");
  
  wall.reset({
    selector: '.brick',
    animate: true,
    cellW: 150,
    cellH: 'auto',
    gutterY: 0,
    gutterX: 0,
      onResize: function() {
      wall.fitWidth();
    }
  });
  var images = wall.container.find('.brick');
    images.find('img').load(function() {
      wall.fitWidth();
    });
}

function addImageGrayScale() {
  // Fade in images so there isn't a color "pop" document load and then on window load
  $(".brick img").fadeIn(500);
  
  // clone image
  $('.brick img').each(function(){
    var el = $(this);
    el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
      var el = $(this);
      el.parent().css({"width":this.width,"height":this.height});
      el.dequeue();
    });
    this.src = grayscale(this.src);
  });
  
  // Fade image 
  $('.brick img').mouseover(function(){
    $(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
  })
  $('.img_grayscale').mouseout(function(){
    $(this).stop().animate({opacity:0}, 1000);
  });   
};

// Grayscale w canvas method
function grayscale(src) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var imgObj = new Image();
  imgObj.src = src;
  canvas.width = imgObj.width;
  canvas.height = imgObj.height; 
  ctx.drawImage(imgObj, 0, 0); 
  var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(var y = 0; y < imgPixels.height; y++){
    for(var x = 0; x < imgPixels.width; x++){
      var i = (y * 4) * imgPixels.width + x * 4;
      var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
      imgPixels.data[i] = avg; 
      imgPixels.data[i + 1] = avg; 
      imgPixels.data[i + 2] = avg;
    }
  }
  ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  return canvas.toDataURL();
}

function weddingParty() {
  
  //  LADIES
  var image_id = '#ladyGallery'
  var img_html = "<img class='img-circle' src='/ladies/INDEX.png' height='150px' width='150px'>";
  var div_open = "<div class='col-md-3 col-centered-demo'>"
  var div_close = "</div>"
  
  var image_list = makeList(0,6);
  imageWriter(image_id, img_html, div_open, div_close, image_list)

  //  DUDES
  var image_id = '#dudeGallery'
  var img_html = "<img class='img-circle' src='/dudes/INDEX.png' height='150px' width='150px'>";
  var div_open = "<div class='col-md-3 col-centered-demo'>"
  var div_close = "</div>"
  
  var image_list = makeList(0,8);
  imageWriter(image_id, img_html, div_open, div_close, image_list)

}

function imageWriter(image_id, img_html, div_open, div_close, img_list) 
{
  
  fresh_list = shuffle(img_list);
  html = '';
  for (var i = 0; i < fresh_list.length; ++i) {
    html += div_open;
    var name = getNameFor(fresh_list[i], image_id)
    html += "<div class='circle-text'>" + name + "</div>"
    html += img_html.replace(/INDEX/g, fresh_list[i] );
    html += div_close;
  }
  $(image_id).append(html);
}

function getNameFor(index, image_id) {
  var dudeNameList = { 
    0: "Brian", 
    1: "David", 
    2: "Gary", 
    3: "JB", 
    4: "Brother Cutrell", 
    5: "Matt",
    6: "Mix Master Nugs",
    7: "Pete",
    8: "Billy"
  }

  var ladyNameList = {
    0: "Donna", 
    1: "Hannah", 
    2: "Hilary", 
    3: "Madelana", 
    4: "Madison", 
    5: "Makayla",
    6: "Lobes",
  }

  if (image_id == "#dudeGallery") {
    return dudeNameList[index]
  } else {
    return ladyNameList[index]
  };

}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function makeList(lowEnd, highEnd) {
  var list = [];
  for (var i = lowEnd; i <= highEnd; i++) {
      list.push(i);
  }
  return list
}



