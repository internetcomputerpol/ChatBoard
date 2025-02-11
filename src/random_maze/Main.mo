import Array "mo:base/Array";

actor WhiteBoard {

  type Message = {
    user: Text;
    content: Text;
  };

   stable var messages: [Message] = [];

  public func addMessage(user: Text, content: Text) : async () {
    let newMessage: Message = 
    { 
      user = user; 
      content = content 
    };
    messages := Array.append(messages, [newMessage]);
  };

  public query func getMessages() : async [Message] {
    return messages;
  };
};
