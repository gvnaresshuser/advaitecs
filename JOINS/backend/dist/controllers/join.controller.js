"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeDepartmentProjects = exports.employeeProjects = exports.departmentsWithoutEmployees = exports.employeesWithoutDepartment = exports.selfJoin = exports.naturalJoin = exports.crossJoin = exports.fullOuterJoin = exports.rightJoin = exports.leftJoin = exports.innerJoin = void 0;
const join_service_js_1 = require("../services/join.service.js");
// ============================================================
// INNER JOIN
// ============================================================
const innerJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getInnerJoin)();
        res.json({
            join: "INNER JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.innerJoin = innerJoin;
// ============================================================
// LEFT JOIN
// ============================================================
const leftJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getLeftJoin)();
        res.json({
            join: "LEFT JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.leftJoin = leftJoin;
// ============================================================
// RIGHT JOIN
// ============================================================
const rightJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getRightJoin)();
        res.json({
            join: "RIGHT JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.rightJoin = rightJoin;
// ============================================================
// FULL OUTER JOIN
// ============================================================
const fullOuterJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getFullOuterJoin)();
        res.json({
            join: "FULL OUTER JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.fullOuterJoin = fullOuterJoin;
// ============================================================
// CROSS JOIN
// ============================================================
const crossJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getCrossJoin)();
        res.json({
            join: "CROSS JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.crossJoin = crossJoin;
// ============================================================
// NATURAL JOIN
// ============================================================
const naturalJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getNaturalJoin)();
        res.json({
            join: "NATURAL JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.naturalJoin = naturalJoin;
// ============================================================
// SELF JOIN
// ============================================================
const selfJoin = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getSelfJoin)();
        res.json({
            join: "SELF JOIN",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.selfJoin = selfJoin;
// ============================================================
// EMPLOYEES WITHOUT DEPARTMENT
// ============================================================
const employeesWithoutDepartment = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getEmployeesWithoutDepartment)();
        res.json({
            join: "LEFT JOIN + IS NULL",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.employeesWithoutDepartment = employeesWithoutDepartment;
// ============================================================
// DEPARTMENTS WITHOUT EMPLOYEES
// ============================================================
const departmentsWithoutEmployees = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getDepartmentsWithoutEmployees)();
        res.json({
            join: "RIGHT JOIN + IS NULL",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.departmentsWithoutEmployees = departmentsWithoutEmployees;
// ============================================================
// EMPLOYEE PROJECTS
// ============================================================
const employeeProjects = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getEmployeeProjects)();
        res.json({
            join: "EMPLOYEE + PROJECT",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.employeeProjects = employeeProjects;
// ============================================================
// EMPLOYEE + DEPARTMENT + PROJECT
// ============================================================
const employeeDepartmentProjects = async (_req, res, next) => {
    try {
        const data = await (0, join_service_js_1.getEmployeeDepartmentProjects)();
        res.json({
            join: "EMPLOYEE + DEPARTMENT + PROJECT",
            count: data.length,
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.employeeDepartmentProjects = employeeDepartmentProjects;
//# sourceMappingURL=join.controller.js.map