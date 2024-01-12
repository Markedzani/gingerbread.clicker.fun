const CLICK_SOUND_PATH = "./clicksoundeffect.mp3";
const BUY_AUDIO = new Audio("./ka-ching.mp3")


var cpc = 1
var cash = 0
var auto_CAN_USE = false
var autoVal = 1
var aCost = 100
var aMaxed = false

setTimeout(function () { document.getElementById("counter").textContent = "cash: " + cash }, 1)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tickled() {
    console.log("AHHHFHFAHAHWHFAH")
    cash += cpc
    document.getElementById("counter").textContent = "cash: " + cash
    console.log(cash)
    console.log(toString(cash))
};

document.addEventListener('click', function () {
    var audio = new Audio(CLICK_SOUND_PATH)
    audio.play()
});

// +1 CPC -- cash per click

function CPC(amount, loss /* amount = CPC += num, loss = cash -= num */) {
    if (cash >= loss) {
        cash -= loss
        cpc += amount
        document.getElementById("counter").textContent = "cash: " + cash
        document.getElementById("CpC").textContent = "[ +" + cpc + "$/click ]"
        BUY_AUDIO.play()
    } else {
        alert("Upgrade failed, you need " + (loss - cash) + "$ more!")
    }
}

async function autoC() {
    while (true) {
        if (auto_CAN_USE) {
            await delay(autoVal * 1000 - 20)
            cash += cpc
            document.getElementById("counter").textContent = "cash: " + cash
        }
        await delay(20)
    }
}

function aRem(amount) {
    if (!(aMaxed)) {
        if (cash >= aCost) {
            cash -= aCost
            if (!(auto_CAN_USE)) {
                auto_CAN_USE = true
                autoC()
            } else {
                autoVal -= amount
            }
            aCost = Math.floor(aCost * 1.25)

            document.getElementById("-.01AUTO").textContent = "-0.01⏰ $" + aCost
            document.getElementById("Auto").textContent = "[ " + (Math.round(autoVal * 100) / 100) + "s , " + (Math.round((1 / autoVal) * 100) / 100) + " clicks/s ]"
            document.getElementById("counter").textContent = "cash: " + cash

            if (autoVal <= 0.03) {
                document.getElementById("-.01AUTO").textContent = "!! MAXED !!"
                aMaxed = true
            }

            BUY_AUDIO.play()
        } else {
            alert("Nope, not enough. need " + (aCost - cash) + " more dollaz.")
        }
    } else {
        alert("sorry bro, you maxed it. you do not wanna mess up your device.")
    }
}