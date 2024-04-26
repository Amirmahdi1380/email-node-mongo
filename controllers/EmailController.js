const Email = require('../models/Email');

class EmailController {
    async sendEmail(req, res) {
  
        const { receiver, subject, message } = req.body;
        const sender = req.cookies.email; 
        console.log(req.cookies.email);
        try {
            const email = new Email({ sender, receiver, subject, message });
         
            await email.save();
            res.status(201).send('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getEmails(req, res) {
        const receiver = req.cookies.email; 

        try {
            const emails = await Email.aggregate([
                { $match: { receiver } },
                { $sort: { timestamp: -1 } }
            ]);
   
            res.json(emails);
        } catch (error) {
            console.error('Error getting sent emails:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    async getSentEmails(req, res) {
        const sender = req.cookies.email;
    
        try {
            const emails = await Email.aggregate([
                { $match: { sender } },
                { $sort: { timestamp: -1 } }
            ]);
        
            res.json(emails);
        } catch (error) {
            console.error('Error getting sent emails:', error);
            res.status(500).send('Internal Server Error');
        }
    }
  
    async searchSentEmails(req, res) {
        const { query } = req.body;
    
        try {
            const searchResults = await Email.aggregate([
                {
                    $match: {
                        $or: [
                            { sender: req.cookies.email },
                            { receiver: req.cookies.email }
                        ],
                        $or: [
                            { subject: { $regex: query, $options: 'i' } },
                            { message: { $regex: query, $options: 'i' } }
                        ]
                    }
                }
            ]);
    
            res.status(200).json(searchResults);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    async filterEmailsByDate(req, res) {
        const { startDate, endDate } = req.body;
        const emailType = req.params.type; // 'inbox' or 'sent'
    
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);
    
        try {
            let emails;
            if (emailType === 'inbox') {
                emails = await Email.aggregate([
                    { 
                        $match: { 
                            receiver: req.cookies.email, 
                            timestamp: { 
                                $gte: new Date(startDate), 
                                $lte: new Date(endDate) 
                            } 
                        } 
                    },
                    { $sort: { timestamp: -1 } }
                ]);
            } else if (emailType === 'sent') {
                emails = await Email.aggregate([
                    { 
                        $match: { 
                            sender: req.cookies.email, 
                            timestamp: { 
                                $gte: new Date(startDate), 
                                $lte: new Date(endDate) 
                            } 
                        } 
                    },
                    { $sort: { timestamp: -1 } }
                ]);
            }
    
            console.log("Filtered emails:", emails);
    
            res.json(emails);
        } catch (error) {
            console.error('Error filtering emails by date:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
    
    
}

module.exports = EmailController;
