import Conversation from '../model/conversation.js';

export const newConversation = async(request, response) => {
    let senderId = request.body.senderId;
    let reciverId = request.body.reciverId;
    try {
        const exist = await Conversation.findOne({members:{$all:[reciverId,senderId]}})
        if(exist){
            response.status(200).json('reciverId is already exist');
            return;
        }
        const newConversation = new Conversation ({
            members:[senderId,reciverId]
        })

        await newConversation.save();
        response.status(200).json('new conversation added successfully');

    } catch (error) {
        response.status(500). json(error);
    }
}
export const getConversation = async (request, response) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [ request.body.sender, request.body.receiver] }});
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
}

