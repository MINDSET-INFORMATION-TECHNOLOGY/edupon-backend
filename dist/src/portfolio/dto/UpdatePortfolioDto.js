"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortfolioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const CreatePortfolioDto_1 = require("./CreatePortfolioDto");
class UpdatePortfolioDto extends (0, mapped_types_1.PartialType)(CreatePortfolioDto_1.CreatePortfolioDto) {
}
exports.UpdatePortfolioDto = UpdatePortfolioDto;
//# sourceMappingURL=UpdatePortfolioDto.js.map