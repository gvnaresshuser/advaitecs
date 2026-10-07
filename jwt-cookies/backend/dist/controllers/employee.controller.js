"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesPaginated = exports.getDepartmentsHavingMoreThanOneEmployee = exports.getDepartmentStatistics = exports.getDepartmentsWithEmployees = exports.getEmployeesWithDepartments = exports.getEmployees = void 0;
const employeeRepository = __importStar(require("../repositories/employee.repository"));
const getEmployees = async (_req, res) => {
    try {
        const employees = await employeeRepository.getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch employees",
        });
    }
};
exports.getEmployees = getEmployees;
const getEmployeesWithDepartments = async (_req, res) => {
    try {
        const employees = await employeeRepository.getEmployeesWithDepartments();
        res.json(employees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch employees with departments",
        });
    }
};
exports.getEmployeesWithDepartments = getEmployeesWithDepartments;
const getDepartmentsWithEmployees = async (_req, res) => {
    try {
        const data = await employeeRepository.getDepartmentsWithEmployees();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch departments with employees",
        });
    }
};
exports.getDepartmentsWithEmployees = getDepartmentsWithEmployees;
const getDepartmentStatistics = async (_req, res) => {
    try {
        const data = await employeeRepository.getDepartmentStatistics();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch department statistics",
        });
    }
};
exports.getDepartmentStatistics = getDepartmentStatistics;
const getDepartmentsHavingMoreThanOneEmployee = async (_req, res) => {
    try {
        const data = await employeeRepository
            .getDepartmentsHavingMoreThanOneEmployee();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch department HAVING report",
        });
    }
};
exports.getDepartmentsHavingMoreThanOneEmployee = getDepartmentsHavingMoreThanOneEmployee;
const getEmployeesPaginated = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const data = await employeeRepository.getEmployeesPaginated(page, limit);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch paginated employees",
        });
    }
};
exports.getEmployeesPaginated = getEmployeesPaginated;
//# sourceMappingURL=employee.controller.js.map