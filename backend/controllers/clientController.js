import Client from "../models/Client";

export  async function createClientinDB (name, phone, telegram, cars, comment){
    if(!name || !phone) {
        throw new Error('Имя и номер телефона обязательны для заполнения');  
    }

    let cleanPhone = phone.replace(/\D/g, '');
    if(cleanPhone.startWith('8') && cleanPhone.length === 11){
        cleanPhone = '7' + cleanPhone.slice(1);
    }

    const existingClient = await Client.findOne({ phone: cleanPhone });
    if(existingClient){
        throw new Error('Клиент с таким номером телефона уже существует');
    };

    const newClient = newClient({
        name,
        phone: cleanPhone,
        telegram,
        cars: cars || [],
        comment
    });

    return newClient;
};

export async function getClientsFromDB (search, page = 1, limit = 20) {
    let queryCondition = {};
    if(search) {
        queryCondition = {$text: { $search: search } };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const clients = await Client.find(queryCondition)
    .sort(search ? { score: {$meta: 'textScore'}} : {createdAt: -1})
    .skip(skip)
    .limit(parseInt(limit));

    const totalClients = await Client.countDocuments(queryCondition);

    return{
        clients,
        pagination: {
            totalClients,
            currentPage: parseInt(page),
            totalPage: Math.ceil(totalClients / limit)
        }
    };
}
