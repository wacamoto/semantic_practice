if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : ''
      ;
    });
  };
}

function restaurantList() {
    this.restaurant = []
    this.rst = $('#rsts')
    var html = '<div id="{3}" class="test">\
                    <h2><a class="showReadOnlyBtn">{0}</a></h2>\
                    <p>{1}</p>\
                    <span>{2}</span>\
                </div>'

    this.updateData = function(){
        this.restaurant = (function(){
            var temp;
            $.ajax({
                'async': false,
                'dataType': "json",
                'url': 'data.json',
                'success': function (data) {
                    temp = data;
                }
            });
            console.log(temp)
            return temp;
        })()
    }

    this.updateUi = function(){
        var content;

        for (i in this.restaurant) {
            var item = html;

            item = item.format(
                this.restaurant[i].Name, 
                this.restaurant[i].Location, 
                this.restaurant[i].Category,
                i)
            content += item;
        }
        this.rst.html(content)
    }

    this.update = function() {
        this.updateData()
        this.updateUi()
    }
}


function restaurant() {
    this.value = { "ID": 1, "Name": "樂麵屋-南港店", "Phone": "11:00~21:30", "Time": "11:00~21:30", "Location": "115台北市南港區經貿二路166號、2樓", "Category": "麵食", "MenuURL": "http://rakumenya.com.tw/menu.php", "FBURL": "https://www.facebook.com/rakumenya" }
    this.form = $('#rstForm')
    var html = '<div class="ui form">\
                    <div class="field">\
                        <label>Name</label>\
                        <input type="text" id="rst-name" value="{0}" placeholder="First Name">\
                    </div>\
                    <div class="field">\
                        <label>Location</label>\
                        <input type="text" id="rst-location" value="{1}" placeholder="Last Name">\
                    </div>\
                    <div class="field">\
                        <label>Category</label>\
                        <input type="text" id="rst-category" value="{2}" placeholder="Last Name">\
                    </div>\
                    <button id="addRestaurantBtn" onclick="rst.addRestaurant()" class="ui button">Add</button>\
                    <button id="delRestaurantBtn" onclick="rst.delRestaurant()" class="ui button">Del</button>\
                    <button id="setRestaurantBtn" onclick="rst.setRestaurant()" class="ui button">Set</button>\
                </div>'

    this.showReadOnly = function() {
        var content = html.format(
            this.value.Name,
            this.value.Location,
            this.value.Category)
        this.form.html(content)

        $('.ui.modal').modal('show');
        $('#rstForm input').prop("disabled", true);
        $('#addRestaurantBtn, #setRestaurantBtn, #delRestaurantBtn').hide()
    }

    this.showVaule = function() {
        var content = html.format(
            this.value.Name,
            this.value.Location,
            this.value.Category)
        this.form.html(content)

        $('#addRestaurantBtn').hide()
        $('.ui.modal').modal('show');
    }
    this.showEmpty = function() {
        var content = html.format()
        this.form.html(content)

        $('#setRestaurantBtn, #delRestaurantBtn').hide()
        $('.ui.modal').modal('show');
    }

    this.addRestaurant = function() {
        url = 'api/addRestaurant?name={0}&location={1}&category={2}'
        .format(
            $('#rst-name').val(),
            $('#rst-location').val(),
            $('#rst-category').val())
        $.get(url)
    }
    this.setRestaurant = function() {
        url = 'api/setRestaurant?name={0}&location={1}&category={2}'
        .format(
            $('#rst-name').val(),
            $('#rst-location').val(),
            $('#rst-category').val())
        $.get(url)
    }
    this.delRestaurant = function() {
        url = 'api/addRestaurant?id={0}'.format(this.ID)
        $.get(url)
    }
}

rst = new restaurant()
rsts = new restaurantList()
rsts.update()

$('#rsts').on('click', 'div.test', function(){
    var id = $(this).attr('id')
    rst.value = rsts.restaurant[id]
    rst.showReadOnly()
})