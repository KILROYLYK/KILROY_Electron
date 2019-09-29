/**
 * Home
 */
/*global $ json2csv Base*/
(function (w, d) {
    var title = [
            '日期',
            '新注册',
            'DAU',
            '付费额（元）',
            '付费人数',
            'ARPU（元）',
            'ARPPU（元）',
            '付费率'
        ],
        retainDay = 30,
        decimal = 2;
    
    $('#load').change(function () {
        readCSV(this);
    });
    
    $('#save').on('click', function () {
        createCSV();
    });
    
    $('#new').on('click', function () {
        newTableTr();
    });
    
    /**
     * 读取CSV文件
     * @param {object} obj 文件对象
     * @return {void}
     */
    function readCSV(obj) {
        var file = new FileReader();
        
        file.readAsText(obj.files[0]);
        file.onload = function () {
            var _this = this;
            
            if (typeof _this.result !== 'string') return;
            processData(csvToArray(_this.result));
            cypher();
        };
    }
    
    /**
     * CSV转化数组
     * @param {string} csv CSV字符串
     * @return {array} 对象
     */
    function csvToArray(csv) {
        var array = csv.split('\r\n'),
            headers = array[0].split(','),
            data = [];
        
        for (var i = 1; i < array.length; i++) {
            var temp = array[i].split(','),
                obj = {};
            
            for (var j = 0; j < temp.length; j++) {
                obj[headers[j]] = temp[j];
            }
            
            data.push(obj);
        }
        
        return data;
    }
    
    /**
     * 处理数据
     * @param {array} data 数据
     * @return {void}
     */
    function processData(data) {
        var newData = [];
        
        for (var i = 0, n = data.length; i < n; i++) {
            var obj = {};
            
            for (var ii = 0; ii < title.length; ii++) {
                if (ii === 0 ||
                    ii === 1 ||
                    ii === 3 ||
                    ii === 4) {
                    obj[title[ii]] = data[i][title[ii]];
                } else {
                    obj[title[ii]] = 0;
                }
            }
            
            for (var iii = 0; iii < retainDay; iii++) {
                var t = '留存D' + (iii + 1);
                obj[t] = data[i][t];
            }
            
            newData.push(obj);
        }
        
        createTable(newData);
    }
    
    /**
     * 创建Table
     * @param {array} data 数据
     * @return {void}
     */
    function createTable(data) {
        var tableHeader = '',
            tableData = '';
        
        (function () {
            for (var i = 0, n = title.length; i < n; i++) {
                tableHeader += '<td width="100">' + title[i] + '</td>';
            }
            
            for (var ii = 0; ii < retainDay; ii++) {
                tableHeader += '<td width="90">留存D' + (ii + 1) + '</td>';
            }
            
            tableHeader = '<tr>' + tableHeader + '</tr>';
            
            $('#table_header tbody').html(tableHeader);
        })();
        
        (function () {
            for (var i = 0, n = data.length; i < n; i++) {
                var key = Object.keys(data[i]),
                    tr = '';
                
                if (!data[i][title[0]]) break;
                
                for (var ii = 0, nn = key.length; ii < nn; ii++) {
                    var c = '',
                        width = 100;
                    if ((/日期|新注册|付费|留存/i).test(key[ii])) c = 'class="write" title="编辑"';
                    if ((/留存/i).test(key[ii])) width = 90;
                    tr += '<td ' + c + 'width="' + width + '">' + data[i][key[ii]] + '</td>';
                }
                
                tr = '<tr>' + tr + '</tr>';
                tableData += tr;
            }
            
            $('#table_data tbody').html(tableData);
            createInput();
        })();
        
        $('#save,#new,#box_table').addClass('active');
    }
    
    /**
     * 新增一行
     * @return {void}
     */
    function newTableTr() {
        var key = title.length + retainDay,
            tr = '';
        
        for (var i = 0, nn = key; i < nn; i++) {
            var c = '',
                width = 100;
            if (i === 0 ||
                i === 1 ||
                i === 3 ||
                i === 4 ||
                i > 7) {
                c = 'class="write" title="编辑"';
            }
            if (i > 7) width = 90;
            tr += '<td ' + c + 'width="' + width + '"></td>';
        }
        
        tr = '<tr>' + tr + '</tr>';
        
        $('#table_data tbody').append(tr);
        createInput();
    }
    
    /**
     * 创建输入框
     * @return {void}
     */
    function createInput() {
        $('.write')
            .off('click')
            .on('click', function () {
                if ($(this).find('input').length > 0) return;
                var value = $(this).html();
                $(this).html('<input type="text" class="form-control" value="' + value + '"/>');
                $(this).children('input')
                    .focus()
                    .blur(function () {
                        var v = $(this).val();
                        $(this).parent('td').html(v);
                    })
                    .bind('input propertychange', function () {
                        cypher();
                    });
            });
    }
    
    /**
     * 获取Table数据
     * @param {string} id TableID
     * @return {array} 数据
     */
    function getTableData(id) {
        var $table = $('#' + id + ' tbody tr'),
            data = [];
        
        $table.each(function (k0, v0) {
            var tr = [];
            $(v0).children('td').each(function (k1, v1) {
                var $input = $(v1).children('input'),
                    value = '';
                if ($input.length > 0) {
                    value = $input.val();
                } else {
                    value = $(v1).html();
                }
                tr.push(value);
            });
            data[k0] = tr;
        });
        
        return data;
    }
    
    /**
     * 计算
     * @return {void}
     */
    function cypher() {
        var $tableData = $('#table_data tbody tr'),
            data = getTableData('table_data');
        
        $.each(data, function (k0, v0) {
            var dau = 0;
            for (var i = 0; i < k0; i++) {
                var retain = data[i][7 + (k0 - i)];
                if (retain === '' || k0 - i > retainDay) continue;
                retain = retain.replace('.', '');
                retain = retain.replace('%', '');
                dau += parseInt(data[i][1]) * (parseInt(retain) / 10000);
            }
            dau += parseInt(data[k0][1]);
            dau = parseInt(dau.toFixed(0));
            
            $tableData.eq(k0).children('td').eq(2).html(dau);
            $tableData.eq(k0).children('td').eq(5).html((parseInt(v0[3]) / dau).toFixed(decimal));
            $tableData.eq(k0).children('td').eq(6)
                .html((parseInt(v0[3]) / parseInt(v0[4])).toFixed(decimal));
            $tableData.eq(k0).children('td').eq(7).html((parseInt(v0[4]) * 100 / dau).toFixed(decimal) + '%');
        });
    }
    
    /**
     * 创建CSV
     * @return {void}
     */
    function createCSV() {
        var tableHeader = getTableData('table_header')[0],
            tableData = getTableData('table_data'),
            data = [],
            csv = null;
        
        $.each(tableData, function (k0, v0) {
            var tr = {};
            $.each(v0, function (k1, v1) {
                tr[tableHeader[k1]] = v1;
            });
            data.push(tr);
        });
        
        csv = json2csv({
            fields: tableHeader,
            data: data
        });
        
        funDownload('DAU_' + Base.getTime() + '.csv', csv);
    }
    
    /**
     * 下载文件
     * @param {string} name 文件名
     * @param {object} content 内容
     * @return {void}
     */
    function funDownload(name, content) {
        var eleLink = d.createElement('a'),
            blob = new Blob([content]);
        
        eleLink.download = name;
        eleLink.style.display = 'none';
        eleLink.href = URL.createObjectURL(blob);
        d.body.appendChild(eleLink);
        eleLink.click();
        d.body.removeChild(eleLink);
    }
})(window, document);
