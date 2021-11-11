const express = require('express')
const bodyParser = require('body-parser')
// const crypto = require('crypto')
// const token = process.env.SLACK_TOKEN;
// const web = new WebClient(token);
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
const Monkey = require('monkey-typewriter')

router.get('/', (req, res) => {
     console.log('received a [GET] ')

     let w  = Monkey.word()
     let l = w.length+1 - 4;
     let fill = (c,n)=>{
          return Array.apply(null, Array(n)).map(l=>{
               return c
          }).join('')
     }

     let monkey = `
        ${fill(' ',l)}         .="=.
        ${fill(' ',l)}               _/.-.-.\\_     _
        ${fill(' ',l)}               (( o o ) )    ))
        ${fill(' ',l)}               |/  "  \\|    //
       .-${fill('-',l)}------.        \\'---'/    //
    _|  ${w}  |_       /'"""'\\  ((
=(_|__${fill('_',l)}______|_)=    / /_,_\\ \\ \\\\
      |::${fill(':',l)}:::::::|       \\_\\_'__/ \\  ))
     |::${fill(':',l)}:::::[]|       /'  /'~\\  |//
    |o=${fill('=',l)}======.|      /   /    \\  /
  '""${fill('"',l)}"""""""' '--',--'\\/\\    /
        ${fill(' ',l)}           '-- "--'  '--'
                   `

     res.send(`
     <center><pre>${monkey}</pre></center>
     <center style='font:sans-serif;'>
     <div><a href="https://www.npmjs.com/package/monkey-typewriter">npm</a></div
     <div><a href="https://app.cyclic.sh">deploy</a></div>
     </center>
     `)
})


app.listen(process.env.PORT)