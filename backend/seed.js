import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

// ── Inline schemas (mirrors actual models) ──────────────────────────────────
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    image: { type: String },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// ── Seed data ────────────────────────────────────────────────────────────────
const PASSWORD = 'Password1';
const SEED_EMAILS = [
    'alice.kamau@gmail.com',
    'brian.otieno@gmail.com',
    'carol.mwangi@gmail.com',
    'david.njoroge@gmail.com',
];

const seedUsers = [
    { username: 'alice_kamau',   email: 'alice.kamau@gmail.com',   profilePic: 'https://i.pravatar.cc/150?img=47', isVerified: true },
    { username: 'brian_otieno',  email: 'brian.otieno@gmail.com',  profilePic: 'https://i.pravatar.cc/150?img=12', isVerified: true },
    { username: 'carol_mwangi',  email: 'carol.mwangi@gmail.com',  profilePic: 'https://i.pravatar.cc/150?img=32', isVerified: true },
    { username: 'david_njoroge', email: 'david.njoroge@gmail.com', profilePic: 'https://i.pravatar.cc/150?img=15', isVerified: true },
];

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB (chat_db)');

    // Clean seed users
    await User.deleteMany({ email: { $in: SEED_EMAILS } });

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
        seedUsers.map(async (u) => ({ ...u, password: await bcrypt.hash(PASSWORD, 10) }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Seeded ${createdUsers.length} users`);

    // Clean messages between seed users
    const ids = createdUsers.map((u) => u._id);
    await Message.deleteMany({
        $or: [
            { senderId: { $in: ids } },
            { receiverId: { $in: ids } },
        ],
    });

    // Seed some messages between alice <-> brian and carol <-> david
    const [alice, brian, carol, david] = createdUsers;

    const msgSeeds = [
        // alice <-> brian
        { senderId: alice._id, receiverId: brian._id, text: 'Hey Brian! How are you doing?', isRead: true },
        { senderId: brian._id, receiverId: alice._id, text: "I'm great, Alice! Ready for the project?", isRead: true },
        { senderId: alice._id, receiverId: brian._id, text: 'Absolutely, let us crush it 💪', isRead: false },
        // carol <-> david
        { senderId: carol._id, receiverId: david._id, text: 'David, did you check the notes?', isRead: true },
        { senderId: david._id, receiverId: carol._id, text: 'Yeah, looking at them now.', isRead: true },
        { senderId: carol._id, receiverId: david._id, text: 'Cool, let me know if you have questions.', isRead: false },
        // brian <-> carol
        { senderId: brian._id, receiverId: carol._id, text: 'Hi Carol! Are you joining the meeting?', isRead: true },
        { senderId: carol._id, receiverId: brian._id, text: 'On my way!', isRead: false },
    ];

    await Message.insertMany(msgSeeds);
    console.log(`Seeded ${msgSeeds.length} messages`);

    console.log('\n── Seed credentials ─────────────────────────────────');
    createdUsers.forEach((u) => {
        console.log(`  ${u.username}  |  ${u.email}  |  pw: ${PASSWORD}`);
    });
    console.log('──────────────────────────────────────────────────────\n');

    await mongoose.disconnect();
    console.log('Done.');
}

seed().catch((err) => { console.error(err); process.exit(1); });
