const express = require('express')
const uuid = require('uuid') // for generating ID without Database
const router = express.Router()
const members = require('../../Members')

    // Get a single member
router.get('/:id', (req, res) => {
   const found = members.some(member => member.id === parseInt(req.params.id))

   if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
      res.status(400).json({msg: `Ooops! No member with the id of  ${req.params.id}`})
    }
})

    // Get all Members 
router.get('/', (req, res) => res.json(members))

   // Create Member
 router.post('/', (req, res) => {
   const newMember = {
     id: uuid.v4(),
     name: req.body.name,
     email: req.body.email,
     status: 'active'
   }

   if (!newMember.name || !newMember.email) {
      return res.status(400).json({msg: 'Please include a name and email'})
   }

   members.push(newMember)
   res.json(members)
})

// Update Member
router.put('/:id', (req, res) => {
   const found = members.some(member => member.id === parseInt(req.params.id))

   if (found) {
      const updtMember = req.body
      members.forEach(member => {
         if (member.id === parseInt(req.params.id)) {
            member.name = updtMember.name ? updtMember.name : member.name
            member.email = updtMember.email ? updtMember.email : member.email

            res.json({msg: 'Member Updated', member})
         }
      })
    } else {
      res.status(400).json({msg: `Ooops! No member with the id of  ${req.params.id}`})
    }
})

         // Delete Member
router.delete('/:id', (req, res) => {
   const found = members.some(member => member.id === parseInt(req.params.id))

   if (found) {
    res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})
    } else {
      res.status(400).json({msg: `Ooops! No member with the id of  ${req.params.id}`})
    }
})

/*
app.get('/', (req, res) => {
 res.send('<h1>Hello World! </h1>') 
})
   */

// app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

module.exports = router