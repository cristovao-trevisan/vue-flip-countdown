const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}

export default {
  name: 'item',
  render() {
    return (
      <div style={styles.container}>
        { this.$slots.default }
      </div>
    )
  },
}
