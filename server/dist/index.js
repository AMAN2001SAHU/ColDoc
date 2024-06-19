"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const io = require('socket.io')(3000, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
const defaultValue = '';
io.on('connection', (socket) => {
    socket.on('get-document', (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield findOrCreateDocument(documentId);
        if (!document) {
            return;
        }
        socket.join(documentId);
        socket.emit('load-document', document.data);
        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
        socket.on('save-document', (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.document.update({
                where: {
                    id: documentId,
                },
                data: {
                    data: data,
                },
            });
        }));
    }));
});
function findOrCreateDocument(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id == null)
            return;
        let document = yield prisma.document.findFirst({ where: { id: id } });
        if (!document) {
            document = yield prisma.document.create({
                data: { id: id, data: defaultValue },
            });
        }
        // if (document) return document;
        // return await prisma.document.create({ data: { id: id, data: defaultValue } });
        return document;
    });
}
