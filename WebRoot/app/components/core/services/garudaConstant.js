define(['components/core/module', 'lodash'],
    function(module, _) {

        'use strict';

        module.registerFactory('GarudaConstant', ['$rootScope',function($rootScope) {

            var service = {

                getIncSeverity: function(key) {
                    return _.result(_.find(incident.severity, 'key', key), 'value');
                },
                getEvtSeverity: function(key) {
                    return _.result(_.find(event.severity, 'key', key), 'value');
                },
                getMailFilterType: function(key) {
                    return _.result(_.find(mail.riskType, 'key', key), 'value');
                },
                getRisk: function(key) {
                    return _.result(_.find(mail.lastrisk, 'key', key), 'value');
                },
                getAction: function(key) {
                    return _.result(_.find(mail.action, 'key', key), 'value');
                },
                getMalwareSeverity: function(key) {
                	return _.result(_.find(malware.severity, 'key', key), 'value');
                },
                getNameMap: function(){
                    return nameMap;
                },
                getGeoCoordMap: function(){
                	return geoCoordMap;
                },
                getMapName: function(name){
                	return mapName[name];
                }
                
            };

            var incident = {
                severity: [
                    {
                        'key': 1,
                        'value': $rootScope.format('monitor.incident.low')
                    },
                    {
                        'key': 2,
                        'value': $rootScope.format('monitor.incident.mid')
                    },
                    {
                        'key': 3,
                        'value': $rootScope.format('monitor.incident.high')
                    },
                    {
                        'key': 4,
                        'value':  $rootScope.format('monitor.incident.extreme')
                    }
                ]
            };

            var event = {
                severity: [
                    {
                        'key': 0,
                        'value': $rootScope.format('monitor.event.none')
                    },
                    {
                        'key': 1,
                        'value': $rootScope.format('monitor.event.low')
                    },
                    {
                        'key': 2,
                        'value': $rootScope.format('monitor.event.mid')
                    },
                    {
                        'key': 3,
                        'value': $rootScope.format('monitor.event.high')
                    },
                    {
                        'key': 4,
                        'value':  $rootScope.format('monitor.event.extreme')
                    }
                ]
            };

            var malware = {
            		severity: [
            		           {
            		        	   'key': 0,
            		        	   'value': $rootScope.format('monitor.malware.none')
            		           },
            		           {
            		        	   'key': 1,
            		        	   'value': $rootScope.format('monitor.malware.low')
            		           },
            		           {
            		        	   'key': 2,
            		        	   'value': $rootScope.format('monitor.malware.mid')
            		           },
            		           {
            		        	   'key': 3,
            		        	   'value': $rootScope.format('monitor.malware.high')
            		           },
            		           {
            		        	   'key': 4,
            		        	   'value':  $rootScope.format('monitor.malware.extreme')
            		           }
            		           ]
            };

            var mail = {
                riskType: [
                    {
                        'key': 'url_filter',
                        'value': $rootScope.format('dashboard.mail.filter.url')
                    },
                    {
                        'key': 'spam_filter',
                        'value': $rootScope.format('dashboard.mail.filter.spam')
                    },
                    {
                        'key': 'img_filter',
                        'value': $rootScope.format('dashboard.mail.filter.img')
                    },
                    {
                        'key': 'attach_filter',
                        'value': $rootScope.format('dashboard.mail.filter.attach')
                    },
                    {
                        'key': 'black_filter',
                        'value': $rootScope.format('dashboard.mail.filter.black')
                    },
                    {
                        'key': 'nomatch_filter',
                        'value': $rootScope.format('dashboard.mail.filter.nomatch')
                    },
                    {
                        'key': 'content_filter',
                        'value':  $rootScope.format('dashboard.mail.filter.content')
                    }
                ],
                lastrisk: [
                    {
                        'key': 0,
                        'value': '正常'
                    },
                    {
                        'key': 1,
                        'value': '低'
                    },
                    {
                        'key': 2,
                        'value': '中'
                    },
                    {
                        'key': 3,
                        'value': '高'
                    },
                    {
                        'key': 4,
                        'value': '极高'
                    }
                ],
                action: [
                    {
                        'key': 0,
                        'value': '略过检查'
                    },
                    {
                        'key': 1,
                        'value': '通过'
                    },
                    {
                        'key': 2,
                        'value': '通过并加标记'
                    },
                    {
                        'key': 3,
                        'value': '阻断'
                    },
                    {
                        'key': 4,
                        'value': '不转发'
                    }
                ]
            };
            
            var mapName = {
            		'world': '世界',
            		'china': '中国',
            		'anhui': '安徽',
            		'aomen': '澳门',
            		'beijing': '北京',
            		'chongqing': '重庆',
            		'fujian': '福建',
            		'gansu': '甘肃',
            		'guangdong': '广东',
            		'guangxi': '广西',
            		'guizhou': '贵州',
            		'hainan': '海南',
            		'hebei': '河北',
            		'heilongjiang': '黑龙江',
            		'henan': '河南',
            		'hubei': '河北',
            		'hunan': '湖南',
            		'jiangsu': '江苏',
            		'jiangxi': '江西',
            		'jilin': '吉林',
            		'liaoning': '辽宁',
            		'neimenggu': '内蒙古',
            		'ningxia': '宁夏',
            		'qinghai': '青海',
            		'shandong': '山东',
            		'shanghai': '上海',
            		'shanxi': '山西',
            		'sichuan': '四川',
            		'tianjin': '天津',
            		'xianggang': '香港',
            		'xinjiang': '新疆',
            		'xizang': '西藏',
            		'yunnan': '云南',
            		'zhejiang': '浙江'
            }
            
        	var geoCoordMap = {
        		    '上海': [121.4648,31.2891],
        		    '东莞': [113.8953,22.901],
        		    '东营': [118.7073,37.5513],
        		    '中山': [113.4229,22.478],
        		    '临汾': [111.4783,36.1615],
        		    '临沂': [118.3118,35.2936],
        		    '丹东': [124.541,40.4242],
        		    '丽水': [119.5642,28.1854],
        		    '乌鲁木齐': [87.9236,43.5883],
        		    '佛山': [112.8955,23.1097],
        		    '保定': [115.0488,39.0948],
        		    '兰州': [103.5901,36.3043],
        		    '包头': [110.3467,41.4899],
        		    '北京': [116.4551,40.2539],
        		    '北海': [109.314,21.6211],
        		    '南京': [118.8062,31.9208],
        		    '南宁': [108.479,23.1152],
        		    '南昌': [116.0046,28.6633],
        		    '南通': [121.1023,32.1625],
        		    '厦门': [118.1689,24.6478],
        		    '台州': [121.1353,28.6688],
        		    '合肥': [117.29,32.0581],
        		    '呼和浩特': [111.4124,40.4901],
        		    '咸阳': [108.4131,34.8706],
        		    '哈尔滨': [127.9688,45.368],
        		    '唐山': [118.4766,39.6826],
        		    '嘉兴': [120.9155,30.6354],
        		    '大同': [113.7854,39.8035],
        		    '大连': [122.2229,39.4409],
        		    '天津': [117.4219,39.4189],
        		    '太原': [112.3352,37.9413],
        		    '威海': [121.9482,37.1393],
        		    '宁波': [121.5967,29.6466],
        		    '宝鸡': [107.1826,34.3433],
        		    '宿迁': [118.5535,33.7775],
        		    '常州': [119.4543,31.5582],
        		    '广州': [113.5107,23.2196],
        		    '廊坊': [116.521,39.0509],
        		    '延安': [109.1052,36.4252],
        		    '张家口': [115.1477,40.8527],
        		    '徐州': [117.5208,34.3268],
        		    '德州': [116.6858,37.2107],
        		    '惠州': [114.6204,23.1647],
        		    '成都': [103.9526,30.7617],
        		    '扬州': [119.4653,32.8162],
        		    '承德': [117.5757,41.4075],
        		    '拉萨': [91.1865,30.1465],
        		    '无锡': [120.3442,31.5527],
        		    '日照': [119.2786,35.5023],
        		    '昆明': [102.9199,25.4663],
        		    '杭州': [119.5313,29.8773],
        		    '枣庄': [117.323,34.8926],
        		    '柳州': [109.3799,24.9774],
        		    '株洲': [113.5327,27.0319],
        		    '武汉': [114.3896,30.6628],
        		    '汕头': [117.1692,23.3405],
        		    '江门': [112.6318,22.1484],
        		    '沈阳': [123.1238,42.1216],
        		    '沧州': [116.8286,38.2104],
        		    '河源': [114.917,23.9722],
        		    '泉州': [118.3228,25.1147],
        		    '泰安': [117.0264,36.0516],
        		    '泰州': [120.0586,32.5525],
        		    '济南': [117.1582,36.8701],
        		    '济宁': [116.8286,35.3375],
        		    '海口': [110.3893,19.8516],
        		    '淄博': [118.0371,36.6064],
        		    '淮安': [118.927,33.4039],
        		    '深圳': [114.5435,22.5439],
        		    '清远': [112.9175,24.3292],
        		    '温州': [120.498,27.8119],
        		    '渭南': [109.7864,35.0299],
        		    '湖州': [119.8608,30.7782],
        		    '湘潭': [112.5439,27.7075],
        		    '滨州': [117.8174,37.4963],
        		    '潍坊': [119.0918,36.524],
        		    '烟台': [120.7397,37.5128],
        		    '玉溪': [101.9312,23.8898],
        		    '珠海': [113.7305,22.1155],
        		    '盐城': [120.2234,33.5577],
        		    '盘锦': [121.9482,41.0449],
        		    '石家庄': [114.4995,38.1006],
        		    '福州': [119.4543,25.9222],
        		    '秦皇岛': [119.2126,40.0232],
        		    '绍兴': [120.564,29.7565],
        		    '聊城': [115.9167,36.4032],
        		    '肇庆': [112.1265,23.5822],
        		    '舟山': [122.2559,30.2234],
        		    '苏州': [120.6519,31.3989],
        		    '莱芜': [117.6526,36.2714],
        		    '菏泽': [115.6201,35.2057],
        		    '营口': [122.4316,40.4297],
        		    '葫芦岛': [120.1575,40.578],
        		    '衡水': [115.8838,37.7161],
        		    '衢州': [118.6853,28.8666],
        		    '西宁': [101.4038,36.8207],
        		    '西安': [109.1162,34.2004],
        		    '贵阳': [106.6992,26.7682],
        		    '连云港': [119.1248,34.552],
        		    '邢台': [114.8071,37.2821],
        		    '邯郸': [114.4775,36.535],
        		    '郑州': [113.4668,34.6234],
        		    '鄂尔多斯': [108.9734,39.2487],
        		    '重庆': [107.7539,30.1904],
        		    '金华': [120.0037,29.1028],
        		    '铜川': [109.0393,35.1947],
        		    '银川': [106.3586,38.1775],
        		    '镇江': [119.4763,31.9702],
        		    '长春': [125.8154,44.2584],
        		    '长沙': [113.0823,28.2568],
        		    '长治': [112.8625,36.4746],
        		    '阳泉': [113.4778,38.0951],
        		    '青岛': [120.4651,36.3373],
        		    '韶关': [113.7964,24.7028]
        		};            

            var nameMap = {
                'Afghanistan':'阿富汗',
                'Angola':'安哥拉',
                'Albania':'阿尔巴尼亚',
                'United Arab Emirates':'阿联酋',
                'Argentina':'阿根廷',
                'Armenia':'亚美尼亚',
                'French Southern and Antarctic Lands':'法属南半球和南极领地',
                'Australia':'澳大利亚',
                'Austria':'奥地利',
                'Azerbaijan':'阿塞拜疆',
                'Burundi':'布隆迪',
                'Belgium':'比利时',
                'Benin':'贝宁',
                'Burkina Faso':'布基纳法索',
                'Bangladesh':'孟加拉国',
                'Bulgaria':'保加利亚',
                'The Bahamas':'巴哈马',
                'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
                'Belarus':'白俄罗斯',
                'Belize':'伯利兹',
                'Bermuda':'百慕大',
                'Bolivia':'玻利维亚',
                'Brazil':'巴西',
                'Brunei':'文莱',
                'Bhutan':'不丹',
                'Botswana':'博茨瓦纳',
                'Central African Republic':'中非共和国',
                'Canada':'加拿大',
                'Switzerland':'瑞士',
                'Chile':'智利',
                'China':'中国',
                'Ivory Coast':'象牙海岸',
                'Cameroon':'喀麦隆',
                'Democratic Republic of the Congo':'刚果民主共和国',
                'Republic of the Congo':'刚果共和国',
                'Colombia':'哥伦比亚',
                'Costa Rica':'哥斯达黎加',
                'Cuba':'古巴',
                'Northern Cyprus':'北塞浦路斯',
                'Cyprus':'塞浦路斯',
                'Czech Republic':'捷克共和国',
                'Germany':'德国',
                'Djibouti':'吉布提',
                'Denmark':'丹麦',
                'Dominican Republic':'多明尼加共和国',
                'Algeria':'阿尔及利亚',
                'Ecuador':'厄瓜多尔',
                'Egypt':'埃及',
                'Eritrea':'厄立特里亚',
                'Spain':'西班牙',
                'Estonia':'爱沙尼亚',
                'Ethiopia':'埃塞俄比亚',
                'Finland':'芬兰',
                'Fiji':'斐',
                'Falkland Islands':'福克兰群岛',
                'France':'法国',
                'Gabon':'加蓬',
                'United Kingdom':'英国',
                'Georgia':'格鲁吉亚',
                'Ghana':'加纳',
                'Guinea':'几内亚',
                'Gambia':'冈比亚',
                'Guinea Bissau':'几内亚比绍',
                'Equatorial Guinea':'赤道几内亚',
                'Greece':'希腊',
                'Greenland':'格陵兰',
                'Guatemala':'危地马拉',
                'French Guiana':'法属圭亚那',
                'Guyana':'圭亚那',
                'Honduras':'洪都拉斯',
                'Croatia':'克罗地亚',
                'Haiti':'海地',
                'Hungary':'匈牙利',
                'Indonesia':'印尼',
                'India':'印度',
                'Ireland':'爱尔兰',
                'Iran':'伊朗',
                'Iraq':'伊拉克',
                'Iceland':'冰岛',
                'Israel':'以色列',
                'Italy':'意大利',
                'Jamaica':'牙买加',
                'Jordan':'约旦',
                'Japan':'日本',
                'Kazakhstan':'哈萨克斯坦',
                'Kenya':'肯尼亚',
                'Kyrgyzstan':'吉尔吉斯斯坦',
                'Cambodia':'柬埔寨',
                'South Korea':'韩国',
                'Kosovo':'科索沃',
                'Kuwait':'科威特',
                'Laos':'老挝',
                'Lebanon':'黎巴嫩',
                'Liberia':'利比里亚',
                'Libya':'利比亚',
                'Sri Lanka':'斯里兰卡',
                'Lesotho':'莱索托',
                'Lithuania':'立陶宛',
                'Luxembourg':'卢森堡',
                'Latvia':'拉脱维亚',
                'Morocco':'摩洛哥',
                'Moldova':'摩尔多瓦',
                'Madagascar':'马达加斯加',
                'Mexico':'墨西哥',
                'Macedonia':'马其顿',
                'Mali':'马里',
                'Myanmar':'缅甸',
                'Montenegro':'黑山',
                'Mongolia':'蒙古',
                'Mozambique':'莫桑比克',
                'Mauritania':'毛里塔尼亚',
                'Malawi':'马拉维',
                'Malaysia':'马来西亚',
                'Namibia':'纳米比亚',
                'New Caledonia':'新喀里多尼亚',
                'Niger':'尼日尔',
                'Nigeria':'尼日利亚',
                'Nicaragua':'尼加拉瓜',
                'Netherlands':'荷兰',
                'Norway':'挪威',
                'Nepal':'尼泊尔',
                'New Zealand':'新西兰',
                'Oman':'阿曼',
                'Pakistan':'巴基斯坦',
                'Panama':'巴拿马',
                'Peru':'秘鲁',
                'Philippines':'菲律宾',
                'Papua New Guinea':'巴布亚新几内亚',
                'Poland':'波兰',
                'Puerto Rico':'波多黎各',
                'North Korea':'北朝鲜',
                'Portugal':'葡萄牙',
                'Paraguay':'巴拉圭',
                'Qatar':'卡塔尔',
                'Romania':'罗马尼亚',
                'Russia':'俄罗斯',
                'Rwanda':'卢旺达',
                'Western Sahara':'西撒哈拉',
                'Saudi Arabia':'沙特阿拉伯',
                'Sudan':'苏丹',
                'South Sudan':'南苏丹',
                'Senegal':'塞内加尔',
                'Solomon Islands':'所罗门群岛',
                'Sierra Leone':'塞拉利昂',
                'El Salvador':'萨尔瓦多',
                'Somaliland':'索马里兰',
                'Somalia':'索马里',
                'Republic of Serbia':'塞尔维亚共和国',
                'Suriname':'苏里南',
                'Slovakia':'斯洛伐克',
                'Slovenia':'斯洛文尼亚',
                'Sweden':'瑞典',
                'Swaziland':'斯威士兰',
                'Syria':'叙利亚',
                'Chad':'乍得',
                'Togo':'多哥',
                'Thailand':'泰国',
                'Tajikistan':'塔吉克斯坦',
                'Turkmenistan':'土库曼斯坦',
                'East Timor':'东帝汶',
                'Trinidad and Tobago':'特里尼达和多巴哥',
                'Tunisia':'突尼斯',
                'Turkey':'土耳其',
                'United Republic of Tanzania':'坦桑尼亚联合共和国',
                'Uganda':'乌干达',
                'Ukraine':'乌克兰',
                'Uruguay':'乌拉圭',
                'United States of America':'美国',
                'Uzbekistan':'乌兹别克斯坦',
                'Venezuela':'委内瑞拉',
                'Vietnam':'越南',
                'Vanuatu':'瓦努阿图',
                'West Bank':'西岸',
                'Yemen':'也门',
                'South Africa':'南非',
                'Zambia':'赞比亚',
                'Zimbabwe':'津巴布韦'
            };

            return service;

        }]);
    });
