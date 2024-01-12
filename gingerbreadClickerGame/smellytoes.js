const CLICK_SOUND_PATH = "./clicksoundeffect.mp3";
const BUY_SOUND_PATH = "./ka-ching.mp3"

var paused = false

var themee = false

var cpc = 1
var cash = 0

var auto_CAN_USE = false
var autoVal = 1
var aCost = 100
var aMaxed = false

var hunger = 100
var boughtMaid = false

setTimeout(function () { document.getElementById("counter").textContent = "cash: " + cash }, 1)



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tickled() {
    if (!(paused)) {
        console.log("AHHHFHFAHAHWHFAH")
        cash += cpc
        document.getElementById("counter").textContent = "cash: " + cash
        console.log(cash)
        console.log(toString())
    }
};

document.addEventListener('click', function () {
    var audio = new Audio(CLICK_SOUND_PATH)
    audio.play()
});

// +1 CPC -- cash per click

function CPC(amount, loss /* amount = CPC += num, loss = cash -= num */) {
    if (!(paused)) {
        if (cash >= loss) {
            cash -= loss
            cpc += amount
            document.getElementById("counter").textContent = "cash: " + cash
            document.getElementById("CpC").textContent = "[ +" + cpc + "$/click ]"

            const BUY_AUDIO = new Audio(BUY_SOUND_PATH)
            BUY_AUDIO.play()
        } else {
            mistake("Upgrade failed, you need " + (loss - cash) + "$ more!")
        }
    }
}

async function autoC() {
    while (true) {
        if (auto_CAN_USE) {
            await delay(autoVal * 1000 - 20)
            if (!(paused)) {
                cash += cpc
                document.getElementById("counter").textContent = "cash: " + cash
            }
        }
        await delay(20)
    } ab
}

function aRem(amount) {
    if (!(aMaxed)) {
        if (!(paused)) {
            if (cash >= aCost) {
                cash -= aCost
                if (!(auto_CAN_USE)) {
                    auto_CAN_USE = true
                    autoC()
                } else {
                    autoVal -= amount
                }
                aCost = Math.floor(aCost * 1.2)

                document.getElementById("-.01AUTO").textContent = "-0.01⏰ $" + aCost
                document.getElementById("Auto").textContent = "[ " + (Math.round(autoVal * 100) / 100) + "s , " + (Math.round((1 / autoVal) * 100) / 100) + " clicks/s ]"
                document.getElementById("counter").textContent = "cash: " + cash

                if (autoVal <= 0.03) {
                    document.getElementById("-.01AUTO").textContent = "!! MAXED !!"
                    aMaxed = true
                }

                var ka_ching = new Audio(BUY_SOUND_PATH)
                ka_ching.play()
            } else {
                mistake("Nope, not enough. need " + (aCost - cash) + " more dollaz.")
            }
        }
    } else {
        mistake("sorry bro, you maxed it. you do not wanna mess up your device.")
    }
}

async function hungerr() {
    while (true) {
        await (delay(2000))
        if (!(paused)) {
            hunger -= 1
        }
        if (boughtMaid) {
            if (hunger <= 50) {
                if (cash >= 150) {
                    cash -= 150
                    hunger = 100
                } else {
                    mistake("maid trying to get food but you lazy loser cant even get 150$😂 bro wake up")
                }
            }
        }

        document.getElementById("hunger").textContent = "hunger: " + hunger
        if (hunger <= 25) {
            document.getElementById("hunger").style.color = 'firebrick'
        } else if (hunger <= 50) {
            document.getElementById("hunger").style.color = 'gold'
        } else {
            document.getElementById("hunger").style.color = 'aquamarine'
        }

        if (hunger <= 0) {
            alert("Game Over. Gingerbread starved to death. :( click OK to restart.")
            location.reload()
        }
    }
}

function pause(txt) {
    if (paused) {
        paused = false
        document.getElementById("PAUSE").textContent = "PAUSE"
    } else {
        paused = true
        document.getElementById("PAUSE").textContent = "UNPAUSE"
    }
}

async function buyfood() {
    if (!(paused)) {
        if (!(boughtMaid)) {
            const obj = document.getElementById("buyfood")
            obj.style.width = "194px"
            obj.style.height = "245px"
            if (cash >= 150) {
                const audio = new Audio(BUY_SOUND_PATH)
                audio.play()
                cash -= 150
                hunger = 100

                document.getElementById("counter").textContent = "cash: " + cash
                document.getElementById("hunger").textContent = "hunger: " + hunger
            } else {
                mistake("not enough cash. need " + (150 - cash) + " more :(")
            }

            await delay(150)
            obj.style.width = "189px"
            obj.style.height = "242px"
        } else {
            mistake("maid is doin' the job lol")
        }
    }
}

async function mistake(txt) {
    if (!(paused)) {
        const errorEle = document.getElementById("Error")
        errorEle.textContent = txt

        const audio = new Audio("./windowsXPerror.mp3")
        audio.play()
        await delay(1000)
        errorEle.textContent = ""
    }
}

async function buymaid() {
    const obj = document.getElementById("buymaid")
    if (!(paused)) {
        obj.style.width = "194px"
        obj.style.height = "245px"

        if (cash >= 15000) {
            if (!(boughtMaid)) {
                if (hunger <= 50) {
                    hunger = 100
                }
                cash -= 15000
                boughtMaid = true
                document.getElementById("counter").textContent = "cash: " + cash
            } else {
                mistake("you already bought d' maid lol")
            }
        } else {
            if (!(boughtMaid)) {
                mistake("not enough. yu need " + (15000 - cash) + "$")
            } else {
                mistake("you already bought d' maid lol")
            }
        }

        await delay(150)
        obj.style.width = "189px"
        obj.style.height = "242px"
    }
}

function theme() {
    const btn = document.getElementById("THEME")
    const cnt = document.getElementById("counter")

    if (themee) {
        document.body.style.backgroundColor = "white"
        themee = false
        btn.backgroundColor = "#000"
        document.getElementById("GB").src = "./gingerbreadman.png"
        btn.color = "white"
        cnt.style.color = "#000"
    } else {
        document.body.style.backgroundColor = "#000"
        themee = true
        btn.backgroundColor = "white"
        document.getElementById("GB").src = "./Tgingie.png"
        cnt.style.color = "white"
        btn.color = "#000"
    }
}

hungerr()
setTimeout(function () { alert("Welcome, user! In this game, you click the gingerbread to make cash, and buy upgrades. If you scroll down you'll find the food shop, where you can buy food so the gingerbread won't starve. You can also see hunger near the gingerbread. You can see a pause button on the right, so if your game froze, it might be because you paused. Press OK to play.") }, 75)