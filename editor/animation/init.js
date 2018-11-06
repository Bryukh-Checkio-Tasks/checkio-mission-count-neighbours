//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210', 'snap.svg_030'],
    function (extIO, $, Raphael, Snap) {

        function SVG(dom) {

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var cell = 30;
            var pad = 10;

            var paper;

            var sizeXpx;
            var sizeYpx;



            var attrRect = {"stroke": colorBlue4, "stroke-width": 2, "fill": colorBlue1};
            var attrRectBingo = {"stroke": colorBlue4, "stroke-width": 2, "fill": colorOrange1};
            var attrRectNeigh = {"stroke": colorBlue4, "stroke-width": 2, "fill": colorBlue2};
            var attrCircle = {"stroke": colorBlue4, "stroke-width": 1, "fill": colorBlue4};
            var attrCircleNeigh = {"stroke": colorBlue4, "stroke-width": 1, "fill": colorOrange4};

            this.prepare = function (grid, row, col) {

                sizeXpx = cell * grid[0].length + 2 * pad;
                sizeYpx = cell * grid.length + 2 * pad;

                paper = Raphael(dom, sizeXpx, sizeYpx);

                for (var i = 0; i < grid.length; i++) {
                    for (var j = 0; j < grid[0].length; j++) {
                        var r = paper.rect(cell * j + pad, cell * i + pad, cell, cell);
                        var isNeigh = false;
                        if (i === row && j === col) {
                            r.attr(attrRectBingo)
                        }
                        else if ("1101".indexOf(String(Math.abs(i - row)) + String(Math.abs(j - col))) !== -1) {
                            r.attr(attrRectNeigh);
                            isNeigh = true
                        }
                        else {
                            r.attr(attrRect)
                        }
                        if (grid[i][j] === 1) {
                            var c = paper.circle(cell * j + pad + cell / 2, cell * i + pad + cell / 2, cell / 4);
                            if (isNeigh) {
                                c.attr(attrCircleNeigh);
                            }
                            else {
                                c.attr(attrCircle)
                            }
                        }
                    }
                }
            };

        }



        var io = new extIO({
            multipleArguments: true,
            functions: {
                js: 'countNeighbours',
                python: 'count_neighbours'
            },
            animation: function($expl, data){
                var checkioInput = data.in || [
                    [
                        [0, 1, 0],
                        [0, 0, 1],
                        [1, 1, 1]
                    ],
                    1, 1
                ];
                var svg = new SVG($expl[0]);
                svg.prepare(checkioInput[0], checkioInput[1], checkioInput[2]);
            }
        });
        io.start();

    }
);
