
// the following will generate an imageDownloader control
// <div class='imageDownloader' id = 'photo' defautImageSrc='images/No_image.png'>
//
// Use setImageDownloaderBlankImage(id) to set imageDownloader image to No_image.png
// setImageDownloaderImage(id, url) to set imageDownloader image to image url
//
// Use getImageData(id) to extract downloaded base64 image data
// Use clearImageData(id) to clear imageData


$(() => {
    $('.imageDownloader').each(function () {
        let id = $(this).attr('id');
        let defaultImage = $(this).attr('defautImageSrc');
        $(this).append('<img id="e_' +
            id +
            '_UploadedImage" class="UploadedImage" src="' +
            defaultImage +
            '">');
        $(this).append('<input type="hidden" id="e_' +
            id +
            '_ImageData" value="">');
        $(this).append('<input id="e_' +
            id +
            '_ImageUploader" type="file" ' +
            'style="display:none" accept="image/jpeg,image/gif,image/png,image/bmp">');
        ImageUploader_AttachEvent(id);
    })
})

function createUploader() {
    $('.imageDownloader').empty()
    $('.imageDownloader').each(function () {

        let id = $(this).attr('id');
        let defaultImage = $(this).attr('defautImageSrc');
        $(this).append('<img id="e_' +
            id +
            '_UploadedImage" class="UploadedImage" src="' +
            defaultImage +
            '">');
        $(this).append('<input type="hidden" id="e_' +
            id +
            '_ImageData" value="">');
        $(this).append('<input id="e_' +
            id +
            '_ImageUploader" type="file" ' +
            'style="display:none" accept="image/jpeg,image/gif,image/png,image/bmp">');
        ImageUploader_AttachEvent(id);
    })
}

function createSpecificUploader(id, src = '') {
    //passing id for specific targetting
    let imageDownloader = $('#imagePost_' + id);
    imageDownloader.empty();
    let defaultImage = imageDownloader.attr('defautImageSrc');
    imageDownloader.append('<img id="e_' +
        id +
        '_UploadedImage" class="UploadedImage" src="' +
        defaultImage +
        '">');
    imageDownloader.append('<input type="hidden" id="e_' +
        id +
        '_ImageData" value="">');
    imageDownloader.append('<input id="e_' +
        id +
        '_ImageUploader" type="file" ' +
        'style="display:none" accept="image/jpeg,image/gif,image/png,image/bmp">');
    ImageUploader_AttachEvent(id);
    if (src != '')
        setImageDownloaderImage(id, src)
}


function setImageDownloaderBlankImage(id) {
    $('#e_' + id + '_UploadedImage').attr("src", "images/No_image.png");
}
function setImageDownloaderImage(id, url) {
    $('#e_' + id + '_UploadedImage').attr("src", url);
}



function ImageUploader_AttachEvent(id) {
    document.querySelector('#e_' + id + '_ImageUploader').addEventListener('change', preLoadImage);
    // un click sur l'image sera transmis au input #ImageUploader
    document.querySelector('#e_' + id + '_UploadedImage').addEventListener('click', () => {
        document.querySelector('#e_' + id + '_ImageUploader').click();
    });
}

function clearImageData(id) {
    document.querySelector('#e_' + id + '_ImageData').value = "";
}
function getImageData(id) {
    return document.querySelector('#e_' + id + '_ImageData').value;
}
function setImageData(id, value) {
    document.querySelector('#e_' + id + '_ImageData').value = value;
}

function resetUploadedImageSrc(id) {
    let defautImage = $('#e_' + id).attr('defautImageSrc');
    $('#e_' + id + '_UploadedImage').attr('src', defautImage);
}

function setUploadedImageSrc(id, src) {
    document.querySelector('#e_' + id + '_UploadedImage').setAttribute('src', src);
}

function preLoadImage(event) {
    let id = event.target.id.split('_')[1];
    let UploadedImage = document.querySelector('#e_' + id + '_UploadedImage');
    let ImageUploader = document.querySelector('#e_' + id + '_ImageUploader');
    let ImageData = document.querySelector('#e_' + id + '_ImageData');
    if (UploadedImage !== null) {
        let len = ImageUploader.value.length;

        if (len !== 0) {
            let fname = ImageUploader.value;
            let ext = fname.split('.').pop().toLowerCase();

            if ((ext !== "png") &&
                (ext !== "jpg") &&
                (ext !== "jpeg") &&
                (ext !== "bmp") &&
                (ext !== "gif")) {
                alert("Ce n'est pas un fichier d'image de format reconnu. Sélectionnez un autre fichier.");
            }
            else {
                let fReader = new FileReader();

                fReader.readAsDataURL(ImageUploader.files[0]);
                fReader.onloadend = () => {
                    UploadedImage.src = fReader.result;
                    ImageData.value = UploadedImage.src;//.split(',').pop();
                };
            }
        }
        else {
            // UploadedImage.src = null;
        }
    }
    return true;
}
