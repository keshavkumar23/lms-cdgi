const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const { getIo, getReceiverSocketId } = require("../socket/chatSocket");

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            console.log("New message id is :", newMessage.id);
            gotConversation.messages.push(newMessage._id);
        }
        await Promise.all([gotConversation.save(), newMessage.save()]);
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId()(receiverId);
        const io = getIo();
        console.log("Receiver socket id is :", receiverSocketId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};
const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};
module.exports = {
    sendMessage,
    getMessage,
};