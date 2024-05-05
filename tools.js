export function getPaymentStatus({transactionId}) {
    const transaction = data.find(row => row.transaction_id === transactionId);
    if (transaction) {
        return JSON.stringify({ status: transaction.payment_status });
    } 
    return JSON.stringify({ error: 'transaction id not found.' });
}

export function getPaymentDate({transactionId}) {
    const transaction = data.find(row => row.transaction_id === transactionId);
    if (transaction) {
        return JSON.stringify({ date: transaction.payment_date });
    }
    return JSON.stringify({ error: 'transaction id not found.' });
}


export const tools = [
    {
        "type": "function",
        "function": {
            "name": "getPaymentStatus",
            "description": "Get payment status of a transaction",
            "parameters": {
                "type": "object",
                "properties": {
                    "transactionId": {
                        "type": "string",
                        "description": "The transaction id.",
                    }
                },
                "required": ["transactionId"],
            },
        },
    },{
        "type": "function",
        "function": {
            "name": "getPaymentDate",
            "description": "Get the payment date of a transaction",
            "parameters": {
                "type": "object",
                "properties": {
                    "transactionId": {
                        "type": "string",
                        "description": "The transaction id.",
                    }
                },
                "required": ["transactionId"],
            },
        },
    }
]
