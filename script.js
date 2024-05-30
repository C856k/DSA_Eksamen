document.addEventListener('DOMContentLoaded', () => {
    const myArray = [];
    const listElement = document.getElementById('myList');
    const addButton = document.getElementById('addButton');
    const startButton = document.getElementById('startButton');
    const numberInput = document.getElementById('numberInput');

    // Add number to the list
    addButton.addEventListener('click', () => {
        const value = parseInt(numberInput.value);
        if (!isNaN(value)) {
            myArray.push(value);
            updateListDisplay(myArray);
            numberInput.value = '';
        }
    });

    // Start sorting on button click
    startButton.addEventListener('click', () => {
        bubbleSort(myArray);
    });

    function updateListDisplay(arr) {
        listElement.innerHTML = '';
        arr.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            li.setAttribute('data-index', index);
            listElement.appendChild(li);
        });
    }

    async function bubbleSort(arr) {
        let len = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                    
                    // Display the current state of the list with animation
                    await animateSwap(i, i + 1);
                    updateListDisplay(arr);
                }
            }
        } while (swapped);
        return arr;
    }

    function animateSwap(index1, index2) {
        return new Promise((resolve) => {
            const li1 = listElement.querySelector(`li[data-index="${index1}"]`);
            const li2 = listElement.querySelector(`li[data-index="${index2}"]`);

            const li1Transform = `translateX(${li2.offsetLeft - li1.offsetLeft}px)`;
            const li2Transform = `translateX(${li1.offsetLeft - li2.offsetLeft}px)`;

            li1.style.transform = li1Transform;
            li2.style.transform = li2Transform;

            setTimeout(() => {
                li1.style.transform = '';
                li2.style.transform = '';
                resolve();
            }, 500); // Match with CSS transition duration
        });
    }
});
