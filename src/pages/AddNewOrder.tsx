"use client";

import * as React from "react";
import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataItem, ServiceId, ServiceIdLabel, Status } from "@/enum";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

const AddNewOrder = () => {
  const [nama, setNama] = React.useState<string>("");
  const [serviceId, setServiceId] = React.useState<string | undefined>(
    undefined
  );
  const [alamat, setAlamat] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string | undefined>("");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const navigate = useNavigate();

  const handleCreateOrder = () => {
    const orderId = `FS${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const startDate =
      dateRange?.from && format(dateRange.from, "yyyy-MM-dd 01:00:00");
    const endDate =
      dateRange?.to && format(dateRange.to, "yyyy-MM-dd 01:00:00");

    const newOrder: DataItem = {
      orderId,
      status: Status.WAITING_FOR_RESPONSE,
      nama,
      serviceId: serviceId as unknown as ServiceId,
      alamat,
      startDate: startDate || null,
      endDate: endDate || null,
      selectedDate: null,
      notes,
    };

    const storedData = localStorage.getItem("mainData") || "[]";
    const savedData = JSON.parse(storedData);

    localStorage.setItem("mainData", JSON.stringify([newOrder, ...savedData]));
    localStorage.setItem("order-detail", JSON.stringify(newOrder));
    navigate("/order-summary");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 pt-24">
        <h2 className="font-bold text-lg">Add New Order</h2>
        <div className="mt-4">
          <div className="w-full">
            <div className="mb-2">
              <Label htmlFor="name">Nama</Label>
            </div>
            <Input
              type="text"
              id="name"
              placeholder="eg: Homer Simpson"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <div className="mb-2">
              <Label htmlFor="detail-service">Detail Service</Label>
            </div>
            <Select onValueChange={(value) => setServiceId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ServiceIdLabel).map((el, indx) => (
                  <SelectItem key={indx} value={el}>
                    {
                      ServiceIdLabel[
                        el as unknown as keyof typeof ServiceIdLabel
                      ]
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mt-3">
            <div className="mb-2">
              <Label htmlFor="address">Alamat</Label>
            </div>
            <Textarea
              id="address"
              placeholder="Type the address here."
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <div className="mb-2">
              <Label htmlFor="date">Tanggal Penawaran</Label>
            </div>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Pilih Tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Tanggal digunakan untuk melakukan penawaran janji pada customer
            </p>
          </div>
          <div className="w-full mt-3">
            <div className="mb-2">
              <Label htmlFor="notes">Catatan (Opsional)</Label>
            </div>
            <Input
              type="text"
              id="notes"
              placeholder="eg: sekaligus perbaikan kecil"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button
            onClick={handleCreateOrder}
            className="mt-10 w-full bg-blue-500 hover:bg-blue-400"
          >
            Create Order
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AddNewOrder;
