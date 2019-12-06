<script>
getnow() {
      var now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()

      var nowtime =
        year + '-' + this.conver(month) + '-' + this.conver(date) + ' ' + this.conver(hours) + ':' + this.conver(minutes) + ':' + this.conver(seconds)

      this.time = nowtime.toString()
      return nowtime.toString()
    }
    </script>