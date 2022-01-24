$('.btn-shorten').on('click', () => {
    $.ajax({
        url: '/api/url/shorten',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            longUrl: $('#url-field').val()
        }),
        success(data) {
            const resultHTML = `<a class="result" href="${data.shortUrl}">${data.shortUrl}</a>`;
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');
        },
        error: function (request, status, error) {
            alert(request.responseJSON);
        }
    });
});