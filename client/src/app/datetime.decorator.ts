export function FormatDate(): MethodDecorator {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        const dateTime1 = document.getElementById("dateTime")! as HTMLInputElement;
        dateTime1.innerHTML = new Date().toLocaleTimeString();
        setInterval(function () {
            dateTime1.innerHTML = new Date().toLocaleTimeString();
        }, 1000);
    }
}