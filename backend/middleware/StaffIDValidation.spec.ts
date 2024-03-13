import { Request, Response, NextFunction } from "express";
import { verifyStaffID } from "./StaffIDValidation";

describe("Middleware validating staff ID", () => {
  it("Should call next if the ID is of format a_b", () => {
    const mockRequest: Partial<Request> = {
      params: { staff_pass_id: "BOSS_4QXV76PK8MM0" },
    };
    const mockResponse: Partial<Response> = {};
    const nextFunction: NextFunction = jest.fn();
    verifyStaffID(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(nextFunction).toHaveBeenCalled();
  });
  it("Should not call next if the ID is of format a_b", () => {
    const mockStaffID = "MANAGERP49NK2CS3B5G";
    const mockRequest: Partial<Request> = {
      params: { staff_pass_id: mockStaffID },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const nextFunction: NextFunction = jest.fn();
    verifyStaffID(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(nextFunction).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(
      `${mockStaffID} is an invalid staff id!`
    );
  });
  it("Should return status 500 if ID is not of format a_b", () => {
    const mockStaffID = "MANAGERP49NK2CS3B5G";
    const mockRequest: Partial<Request> = {
      params: { staff_pass_id: mockStaffID },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const nextFunction: NextFunction = jest.fn();
    verifyStaffID(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
  it("Should send the right error message if the ID is of format a_b", () => {
    const mockStaffID = "MANAGERP49NK2CS3B5G";
    const mockRequest: Partial<Request> = {
      params: { staff_pass_id: mockStaffID },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const nextFunction: NextFunction = jest.fn();
    verifyStaffID(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.send).toHaveBeenCalledWith(
      `${mockStaffID} is an invalid staff id!`
    );
  });
});
