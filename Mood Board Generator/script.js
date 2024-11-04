document.getElementById('addImageBtn').addEventListener('click', function () {
    const imageInput = document.getElementById('imageInput');
    const moodBoard = document.getElementById('moodBoard');

    for (let i = 0; i < imageInput.files.length; i++) {
        const file = imageInput.files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            moodBoard.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});
