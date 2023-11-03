import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Script() {
    let { id } = useParams();
    let { val } = useParams();
    val = Number(val);

    useEffect(() => {
        let canvas = document.querySelector('.canvas');
        let mainPage = document.querySelector('.mainPage');
        let reset = document.querySelector('.reset');
        let back = document.querySelector('.back');
        let image = new Image();
        image.src = `/img/img${id}.jpg`;
        mainPage.style.display = 'none';

        if(localStorage.getItem('level' + id)) {
            if(val != localStorage.getItem('level' + id)) {
                localStorage.setItem('level' + id, val);
                localStorage.removeItem('arrImg' + id);
                val = val;
            }
        } else {
            localStorage.setItem('level' + id, val);
        }

        let rowNum = val;
        let colNum = val;
        let arr = [];
        
        for (let i = 0; i < rowNum; i++) {
            for (let j = 0; j < colNum; j++) {
                if (i == rowNum - 1 && j == colNum - 1) {
                    arr.push({});
                } else {
                    arr.push({ row: i, col: j });
                }
            }
        }
        
        const mainArr = arr.slice();

        getArr();

        back.addEventListener('click', backMain);
        reset.addEventListener('click', getReset);

        function getReset() {
            localStorage.removeItem('arrImg' + id);
            arr = mainArr.slice();
            drawPic(mainArr);
        }

        function backMain() {
            window.location.href = '/';
        }

        function getArr() {
            if(localStorage.getItem('arrImg' + id)) {
                arr = JSON.parse(localStorage.getItem('arrImg' + id));
            }
        }
        
        function drawPic(arr) {
            getArr();
            canvas.innerHTML = '';

            let widthPic = image.width / rowNum;
            let heightPic = image.height / colNum;
            
            canvas.style.gridTemplateColumns = `repeat(${rowNum}, ${widthPic}px)`;            

            arr.forEach(item => {
                let chunk = document.createElement('canvas');
                chunk.width = widthPic;
                chunk.height = heightPic;

                let ctx = chunk.getContext('2d');

                let x = item.col * widthPic;
                let y = item.row * heightPic;

                ctx.drawImage(image, x, y, widthPic, heightPic, 0, 0, widthPic, heightPic);

                let div = document.createElement('div');
                div.appendChild(chunk);
                canvas.appendChild(div);
            });        
        }

        async function win(arr, mainArr) {
            await new Promise(resolve => setTimeout(resolve, 0.1));
            if (JSON.stringify(arr) === JSON.stringify(mainArr)) {
                alert('win!');
            }
        }

        async function ArrowLeft() {
            let moved = false;
            arr.forEach((item, i) => {
                if(!moved) {
                    if (Object.getOwnPropertyNames(item).length === 0) {                        
                        if (!(i % rowNum == 0)) {
                            let temp1 = arr[i - 1];
                            let temp2 = arr[i];
                            arr[i] = temp1;
                            arr[i - 1] = temp2;
                            moved = true;
                        }
                    }
                }
            })
            localStorage.setItem('arrImg' + id, JSON.stringify(arr));
            drawPic(arr);
            win(arr, mainArr);
        }

        async function arrowRight() {
            let moved = false;
            arr.forEach((item, i) => {
                if(!moved) {
                    if (Object.getOwnPropertyNames(item).length === 0) {
                        if(!((i + 1) % rowNum == 0)) {
                            let temp2 = arr[i + 1];
                            let temp1 = arr[i];
                            arr[i] = temp2;
                            arr[i + 1] = temp1;
                            moved = true;
                        }
                    }
                }
            })
            localStorage.setItem('arrImg' + id, JSON.stringify(arr));
            drawPic(arr);
            win(arr, mainArr);
        }

        function ArrowUp() {
            let moved = false;
            arr.forEach((item, i) => {
                if(!moved) {
                    if (Object.getOwnPropertyNames(item).length === 0) {
                        if(arr[i - rowNum]) {
                            let temp2 = arr[i - colNum];
                            let temp1 = arr[i];
                            arr[i] = temp2;
                            arr[i - colNum] = temp1;
                            moved = true;
                        }
                    }
                }
            })
            localStorage.setItem('arrImg' + id, JSON.stringify(arr));
            drawPic(arr);
            win(arr, mainArr);
        }

        function ArrowDown() {
            let moved = false;
            arr.forEach((item, i) => {
                if(!moved) {
                    if (Object.getOwnPropertyNames(item).length === 0) {
                        if(arr[i + colNum]) {
                            let temp2 = arr[i + colNum];
                            let temp1 = arr[i];
                            arr[i] = temp2;
                            arr[i + colNum] = temp1;
                            moved = true;
                        }
                    }
                }
            })
            localStorage.setItem('arrImg' + id, JSON.stringify(arr));
            drawPic(arr);
            win(arr, mainArr);
        }

        function clickBtn(e) {
            if (e.key == 'ArrowLeft') {
                ArrowLeft();
            }

            if (e.key == 'ArrowRight') {
                arrowRight();
            }

            if (e.key == 'ArrowUp') {
                ArrowUp();
            }

            if (e.key == 'ArrowDown') {
                ArrowDown();
            }
        }

        drawPic(arr);
        window.addEventListener('keydown', clickBtn);
    })
}

export default Script;
