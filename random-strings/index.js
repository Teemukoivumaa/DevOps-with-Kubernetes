
const randomText = () => {
    let random = (Math.random() + 1).toString(36).substring(7);
    
    console.log(random);

    setTimeout(randomText, 5000)
}

randomText()


