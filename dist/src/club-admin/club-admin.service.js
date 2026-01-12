"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubAdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const password_util_1 = require("../common/utils/password.util");
let ClubAdminService = class ClubAdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const password_hash = await (0, password_util_1.hashPassword)(dto.password);
        return this.prisma.clubAdmin.create({
            data: {
                club_id: dto.club_id,
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                password_hash,
                temp_password: dto.password,
            },
        });
    }
    async updateByClubId(club_id, dto) {
        return this.prisma.clubAdmin.updateMany({
            where: { club_id },
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
            },
        });
    }
    async updateProfile(admin_id, dto) {
        return this.prisma.clubAdmin.update({
            where: { admin_id },
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                profile_image: dto.profile_image,
            },
        });
    }
    async updateProfileImage(admin_id, filename) {
        return this.prisma.clubAdmin.update({
            where: { admin_id },
            data: { profile_image: filename },
        });
    }
    findAll() {
        return this.prisma.clubAdmin.findMany({
            select: {
                admin_id: true,
                club_id: true,
                name: true,
                email: true,
                phone: true,
                temp_password: true,
                profile_image: true,
                created_at: true,
            },
        });
    }
};
exports.ClubAdminService = ClubAdminService;
exports.ClubAdminService = ClubAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClubAdminService);
//# sourceMappingURL=club-admin.service.js.map