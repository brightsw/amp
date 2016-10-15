define([
    'components/graphs/module',
    'jquery',
    'd3',
    'd3-sankey'
], function (module, $, config) {
    "use strict";

    return module.registerDirective('d3Chart', ['$rootScope', '$state', '$window', '$http', '$compile', '$timeout', 'Utils', 'GarudaConstant', function ($rootScope, $state, $window, $http, $compile, $timeout, Utils, GarudaConstant) {
        function sankeyChart(scope, element, attributes, data) {
            var margin = {top: 10, right: 10, bottom: 6, left: 10};
            var height = scope.height - margin.top - margin.bottom;
            var width = $(element).parent().outerWidth(true) - margin.left - margin.right;
            if (width < 0) width = 0;

            var formatNumber = d3.format(",.0f"),
                format = function (d) {
                    return formatNumber(d) + "";
                },
                color = d3.scale.category20();

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var sankey = d3.sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .size([width, height]);

            var path = sankey.link();

            render(data);

            function render(data) {
                svg.selectAll("*").remove();

                sankey
                    .nodes(data.nodes)
                    .links(data.links)
                    .layout(32);

                var link = svg.append("g").selectAll(".link")
                    .data(data.links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", path)
                    .style("stroke-width",  function(d) {   
                        return Math.max(1, d.dy);   
                    })  
                    .sort(function (a, b) {
                        return b.dy - a.dy;
                    });

                link.append("title")
                    .text(function (d) {
                        return d.source.name + " → " + d.target.name + "\n" + format(d.value);
                    });

                var node = svg.append("g").selectAll(".node")
                    .data(data.nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                    .call(d3.behavior.drag()
                        .origin(function (d) {
                            return d;
                        })
                        .on("dragstart", function () {
                            this.parentNode.appendChild(this);
                        })
                        .on("drag", dragmove));

                if (scope.chartType == 1) {
                    node.append("rect")
                        .attr("height", function (d) {
                            return d.dy;
                        })
                        .attr("width", sankey.nodeWidth())
                        .style("fill", function (d) {
                            return d.color = color(d.name.replace(/ .*/, ""));
                        })
                        .style("stroke", function (d) {
                            return d3.rgb(d.color).darker(2);
                        })
                        .append("title")
                        .text(function (d) {
                            return d.name + "\n" + format(d.value);
                        });
                } else if (scope.chartType == 2) {
                    node.append("circle")
                        .attr("cx", sankey.nodeWidth() / 2 - 6)
                        .attr("cy", function (d) {
                            return d.dy / 5;
                        })
                        .attr("r", function (d) {
                            return Math.max(3, d.dy);
                        })
                        .style("fill", function (d) {
                            return d.color = color(d.name.replace(/ .*/, ""));
                        })
                        .style("stroke", function (d) {
                            return d3.rgb(d.color).darker(2);
                        })
                        .append("title")
                        .text(function (d) {
                            return d.name + "\n" + format(d.value);
                        });
                } else {
                    node.append("rect")
                        .attr("height", function (d) {
                            return d.dy;
                        })
                        .attr("width", sankey.nodeWidth())
                        .style("fill", function (d) {
                            return d.color = color(d.name.replace(/ .*/, ""));
                        })
                        .style("stroke", function (d) {
                            return d3.rgb(d.color).darker(2);
                        })
                        .append("title")
                        .text(function (d) {
                            return d.name + "\n" + format(d.value);
                        });
                }

                node.append("text")
                    .attr("x", -6)
                    .attr("y", function (d) {
                        return d.dy / 2;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .attr("transform", null)
                    .text(function (d) {
                        return d.name;
                    })
                    .filter(function (d) {
                        return d.x < width / 2;
                    })
                    .attr("x", 6 + sankey.nodeWidth())
                    .attr("text-anchor", "start");

                function dragmove(d) {
                    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
                    sankey.relayout();
                    link.attr("d", path);
                }

            };
        }

        function packChart(scope, element, attributes, data) {
            var margin = {top: 10, right: 10, bottom: 6, left: 10};
            var height = scope.height - 1;
            var width = $(element).parent().outerWidth(true) - margin.left - margin.right;
            if (width < 0) width = 0;

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height);

            var pack = d3.layout.pack()
                .size([width, height])
                .sort(null)
                .value(function (d) {
                    return d.weight;
                })
                .padding(20);

            var nodes = pack.nodes(data);

            var color = d3.scale.category20c();

            var bubbles = svg.selectAll(".bubble")
                .data(nodes.filter(function (d) {
                    return !d.children;
                }))
                .enter()
                .append("g")
                .attr("class", "bubble");

            bubbles.append("circle")
                .style("fill", function (d, i) {
                    return color(i);
                })
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })
                .attr("r", function (d) {
                    return Math.max(10, d.r);
                });

            bubbles.append("text")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                })
                //.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
                .text(function (d) {
                    return d.name;
                });

        }

        function hierarchicalChart(scope, element, attributes, data) {
            var margin = {top: 10, right: 10, bottom: 6, left: 10};
            var height = scope.height - 1;
            var width = $(element).parent().outerWidth(true) - margin.left - margin.right;
            if (width < 0) width = 0;
            var diameter = height,
                radius = diameter / 2,
                innerRadius = radius - 120;

            var cluster = d3.layout.cluster()
                .size([360, innerRadius])
                .sort(null)
                .value(function (d) {
                    return d.size;
                });

            var bundle = d3.layout.bundle();

            var line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(.85)
                .radius(function (d) {
                    return d.y;
                })
                .angle(function (d) {
                    return d.x / 180 * Math.PI;
                });

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

            var link = svg.append("g").selectAll(".link"),
                node = svg.append("g").selectAll(".node");
            
            var nodes = cluster.nodes(packageHierarchy(data)),
                links = packageImports(nodes);

            link = link
                .data(bundle(links))
                .enter().append("path")
                .each(function (d) {
                    d.source = d[0], d.target = d[d.length - 1];
                })
                .attr("class", "link")
                .attr("d", line);

            node = node
                .data(nodes.filter(function (n) {
                    return !n.children;
                }))
                .enter().append("text")
                .attr("class", "node")
                .attr("dy", ".31em")
                .attr("transform", function (d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
                })
                .style("text-anchor", function (d) {
                    return d.x < 180 ? "start" : "end";
                })
                .text(function (d) {
                    return d.key;
                })
                .on("mouseover", mouseovered)
                .on("mouseout", mouseouted);

            d3.select(self.frameElement).style("height", diameter + "px");


	        function mouseovered(d) {
	            node
	                .each(function (n) {
	                    n.target = n.source = false;
	                });
	
	            link
	                .classed("link--target", function (l) {
	                    if (l.target === d) return l.source.source = true;
	                })
	                .classed("link--source", function (l) {
	                    if (l.source === d) return l.target.target = true;
	                })
	                .filter(function (l) {
	                    return l.target === d || l.source === d;
	                })
	                .each(function () {
	                    this.parentNode.appendChild(this);
	                });
	
	            node
	                .classed("node--target", function (n) {
	                    return n.target;
	                })
	                .classed("node--source", function (n) {
	                    return n.source;
	                });
	        }
	
	        function mouseouted(d) {
	            link
	                .classed("link--target", false)
	                .classed("link--source", false);
	
	            node
	                .classed("node--target", false)
	                .classed("node--source", false);
	        }
	
	        function packageHierarchy(classes) {
	            var map = {};
	
	            function find(name, data) {
	                var node = map[name], i;
	                if (!node) {
	                    node = map[name] = data || {name: name, children: []};
	                    if (name.length) {
	                        node.parent = find(name.substring(0, i = name.lastIndexOf("@")));
	                        node.parent.children.push(node);
	                        node.key = name.substring(i + 1);
	                    }
	                }
	                return node;
	            }
	
	            classes.forEach(function (d) {
	                find(d.name, d);
	            });
	
	            return map[""];
	        }
	
	        function packageImports(nodes) {
	            var map = {},
	                imports = [];
	
	            nodes.forEach(function (d) {
	                map[d.name] = d;
	            });
	
	            nodes.forEach(function (d) {
	                if (d.imports) d.imports.forEach(function (i) {
	                    imports.push({source: map[d.name], target: map[i]});
	                });
	            });
	
	            return imports;
	        }
        }

        return {
            restrict: 'EA',
            scope: {
                data: '@',
                widgetPageId: '@',
                isFullscreen: '@',
                chartType: '@',
                loadData: '&',
                onClick: "&",
                height: "@"
            },
            link: function (scope, element, attributes, data) {
                var params = {};
                params.func = scope.data;
                params.param = {};
                var url = params.func;
                if (url != "") {
                    load();
                }
                function load() {
                    scope.loadData({
                        callback: params
                    }).then(function (data) {
                        if (scope.chartType == "1") {
                            sankeyChart(scope, element, attributes, data);
                        } else if (scope.chartType == "2") {
                            packChart(scope, element, attributes, data);
                        } else if (scope.chartType == "3") {
                            hierarchicalChart(scope, element, attributes, data);
                        }
                    }, function (data) {

                    });
                }

            }
        };
    }]);
});
