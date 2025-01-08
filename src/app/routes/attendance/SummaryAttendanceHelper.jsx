import {OFF as SHIFT_OFF, PERMIT as SHIFT_PERMIT} from '../../../constants/ShiftType';
import {
  ABSENCE, OFF, PERMIT, PRESENT
} from '../../../constants/ShiftTypeColor';

export const CountSummaryAttendance = (attendances) => {
  let present = 0;
  let absent = 0;
  let permit = 0;
  let off = 0;
  attendances.forEach((d) => {
    if (d.attendance !== null) {
      if (d.id_shift_type === 'P' || d.id_shift_type === 'S') { // shift Pagi/Siang dan ada absennya
        present += 1;
      } else if (d.attendance.type.id === 1) { // seharusnya gak masuk, di set masuk
        present += 1;
      } else if (d.attendance.type.id === 7 && d.attendance.approval_status === 1) { // seharusnya gak masuk, di set lembur dan disetujui
        present += 1;
      } else off += 1; // masuk absen tapi tidak ada jadwal dan tidak diapprove
    } else if (d.id_shift_type === 'OFF') {
      off += 1;
    } else if (d.id_shift_type === 'C') permit += 1;
    else {
      absent += 1;
    }
  });
  return {
    present, absent, permit, off
  };
};

export const AttendanceColorAndDescriptionMapping = (id_shift_type, attendance) => {
  let shiftColor;
  let statusDesc;

  if (attendance) {
    if (id_shift_type === 'P' || id_shift_type === 'S') { // jadwal masuk/tidak
      shiftColor = PRESENT.style;
      statusDesc = PRESENT.name;
    } else if (attendance.type.id === 1 || (attendance.type.id === 7 && attendance.approval_status === 1)) { // masuk / lembur dari atasan
      shiftColor = PRESENT.style;
      statusDesc = PRESENT.name;
    }
  } else if (id_shift_type === SHIFT_PERMIT) {
    shiftColor = PERMIT.style; statusDesc = PERMIT.name;
  } else if (id_shift_type === SHIFT_OFF) {
    shiftColor = OFF.style;
    statusDesc = OFF.name;
  } else {
    shiftColor = ABSENCE.style; statusDesc = ABSENCE.name;
  }

  return { shiftColor, statusDesc };
};
